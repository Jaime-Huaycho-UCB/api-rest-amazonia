import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../entities/usuario.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { LoginDto } from '../dto/login.dto';
import { RegisterUsuarioDto } from '../dto/register-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UpdatePerfilPropioDto } from '../dto/update-perfil-propio.dto';
import { TokenResponseDto } from '../dto/token-response.dto';
import { UsuarioResponseDto } from '../dto/usuario-response.dto';
import { PaginationParamsDto } from 'src/shared/dto/pagination-params.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { MyJwtConfig } from 'src/infrastructure/config/services/jwt.config';
import {
    MyUnauthorizedException,
    MyConflictException,
    MyNotFoundException,
    MyForbiddenException,
} from 'src/shared/exceptions';
import { comparePassword, hashPassword } from 'src/shared/utils/crypto.util';
import { buildPagination } from 'src/shared/utils/pagination.util';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly jwtService: JwtService,
        private readonly jwtConfig: MyJwtConfig,
    ) {}

    // Dummy hash para prevenir timing attacks (OWASP A07 - user enumeration)
    private readonly DUMMY_HASH = '$2b$12$dummyhashfortimingattackprevention.XXXXXXXXXXXXXXXXXX';

    async login(dto: LoginDto): Promise<TokenResponseDto> {
        const usuario = await this.usuarioRepo.findOne({
            where: { email: dto.email },
            select: ['id', 'email', 'passwordHash', 'nombre', 'rol', 'activo', 'fechaExpiracion'],
        });

        // Siempre ejecutar comparePassword para que el tiempo de respuesta sea constante
        // y no revelar si el email existe o no (OWASP A07 - user enumeration prevention)
        const hashToCompare = usuario ? usuario.passwordHash : this.DUMMY_HASH;
        const passwordValido = await comparePassword(dto.password, hashToCompare);

        if (!usuario || !passwordValido) {
            throw new MyUnauthorizedException('Credenciales inválidas');
        }

        if (!usuario.activo) {
            throw new MyUnauthorizedException('Cuenta desactivada');
        }

        if (usuario.fechaExpiracion && new Date() > new Date(usuario.fechaExpiracion)) {
            throw new MyUnauthorizedException('Tu acceso ha expirado');
        }

        const payload: JwtPayload = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre,
            fechaExpiracion: usuario.fechaExpiracion
                ? usuario.fechaExpiracion.toISOString()
                : null,
        };

        const accessToken = this.jwtService.sign(payload);
        const config = this.jwtConfig.get();

        return {
            accessToken,
            tipo: 'Bearer',
            expiresIn: config.expiresIn,
        };
    }

    async me(payload: JwtPayload): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepo.findOne({ where: { id: payload.sub } });
        if (!usuario) {
            throw new MyNotFoundException('Usuario no encontrado');
        }
        return this.toResponse(usuario);
    }

    async register(dto: RegisterUsuarioDto, currentUser: JwtPayload): Promise<UsuarioResponseDto> {
        // Admin solo puede crear Admin; Superadmin puede crear cualquier rol
        if (currentUser.rol === RoleEnum.Admin && dto.rol === RoleEnum.Superadmin) {
            throw new MyForbiddenException('Un Admin no puede crear usuarios con rol Superadmin');
        }

        const existente = await this.usuarioRepo.findOne({ where: { email: dto.email } });
        if (existente) {
            throw new MyConflictException(`Ya existe un usuario con el email ${dto.email}`);
        }

        const passwordHash = await hashPassword(dto.password);
        const usuario = this.usuarioRepo.create({
            email: dto.email,
            nombre: dto.nombre,
            passwordHash,
            rol: dto.rol,
            activo: true,
            fechaExpiracion: null,
        });

        const guardado = await this.usuarioRepo.save(usuario);
        return this.toResponse(guardado);
    }

    async findAll(params: PaginationParamsDto): Promise<PaginationResponseDto<UsuarioResponseDto>> {
        const { page, limit } = params;
        const [usuarios, total] = await this.usuarioRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return buildPagination(usuarios.map((u) => this.toResponse(u)), total, page, limit);
    }

    async update(id: number, dto: UpdateUsuarioDto, currentUser: JwtPayload): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario) {
            throw new MyNotFoundException('Usuario no encontrado');
        }

        if (dto.rol === RoleEnum.Superadmin && currentUser.rol !== RoleEnum.Superadmin) {
            throw new MyForbiddenException('Solo un Superadmin puede asignar el rol Superadmin');
        }

        if (dto.nombre !== undefined) usuario.nombre = dto.nombre;
        if (dto.activo !== undefined) usuario.activo = dto.activo;
        if (dto.rol !== undefined) usuario.rol = dto.rol;

        const actualizado = await this.usuarioRepo.save(usuario);
        return this.toResponse(actualizado);
    }

    async updateMe(dto: UpdatePerfilPropioDto, currentUser: JwtPayload): Promise<UsuarioResponseDto> {
        const usuario = await this.usuarioRepo.findOne({ where: { id: currentUser.sub } });
        if (!usuario) {
            throw new MyNotFoundException('Usuario no encontrado');
        }
        // El usuario no puede cambiar su propio rol desde este endpoint
        if (dto.nombre !== undefined) usuario.nombre = dto.nombre;
        const actualizado = await this.usuarioRepo.save(usuario);
        return this.toResponse(actualizado);
    }

    async changePassword(currentPasswordPlain: string, newPasswordPlain: string, currentUser: JwtPayload): Promise<void> {
        const usuario = await this.usuarioRepo.findOne({
            where: { id: currentUser.sub },
            select: ['id', 'passwordHash'],
        });
        if (!usuario) {
            throw new MyNotFoundException('Usuario no encontrado');
        }

        // Verificar contraseña actual antes de cambiarla
        const passwordValido = await comparePassword(currentPasswordPlain, usuario.passwordHash);
        if (!passwordValido) {
            throw new MyUnauthorizedException('La contraseña actual es incorrecta');
        }

        usuario.passwordHash = await hashPassword(newPasswordPlain);
        await this.usuarioRepo.save(usuario);
    }

    async delete(id: number, currentUser: JwtPayload): Promise<void> {
        if (id === currentUser.sub) {
            throw new MyForbiddenException('No puedes eliminar tu propia cuenta');
        }

        const usuario = await this.usuarioRepo.findOne({ where: { id } });
        if (!usuario) {
            throw new MyNotFoundException('Usuario no encontrado');
        }

        await this.usuarioRepo.remove(usuario);
    }

    private toResponse(usuario: Usuario): UsuarioResponseDto {
        return {
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol,
            activo: usuario.activo,
            fechaExpiracion: usuario.fechaExpiracion,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt,
        };
    }
}
