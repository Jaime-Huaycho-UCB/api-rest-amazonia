import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterUsuarioDto } from '../dto/register-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { TokenResponseDto } from '../dto/token-response.dto';
import { UsuarioResponseDto } from '../dto/usuario-response.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { PaginationParamsDto } from 'src/shared/dto/pagination-params.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';
import {
    OkRes,
    CreatedRes,
    SwaggerBadRequestCommon,
    SwaggerUnauthorizedCommon,
    SwaggerForbiddenCommon,
    SwaggerNotFoundCommon,
    SwaggerConflictCommon,
} from 'src/shared/utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
    @ApiCreatedResponse({ type: TokenResponseDto, description: 'Login exitoso, retorna token JWT' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    async login(@Body() dto: LoginDto, @Res() res: Response) {
        const result = await this.authService.login(dto);
        return CreatedRes(res, result);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Obtener información del usuario autenticado' })
    @ApiOkResponse({ type: UsuarioResponseDto, description: 'Datos del usuario autenticado' })
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    async me(@CurrentUser() user: JwtPayload, @Res() res: Response) {
        const result = await this.authService.me(user);
        return OkRes(res, { usuario: result });
    }

    @Post('register')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Crear nuevo usuario (Admin o Superadmin). Solo Admin+.' })
    @ApiCreatedResponse({ type: UsuarioResponseDto, description: 'Usuario creado exitosamente' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    @ApiConflictResponse(SwaggerConflictCommon())
    async register(
        @Body() dto: RegisterUsuarioDto,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        const result = await this.authService.register(dto, user);
        return CreatedRes(res, { usuario: result });
    }

    @Get('usuarios')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Listar todos los usuarios con paginación. Solo Admin+.' })
    @ApiOkResponse({ type: PaginationResponseDto, description: 'Listado paginado de usuarios' })
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    async findAll(@Query() params: PaginationParamsDto, @Res() res: Response) {
        const result = await this.authService.findAll(params);
        return OkRes(res, result);
    }

    @Patch('usuarios/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Actualizar datos de un usuario. Solo Admin+.' })
    @ApiOkResponse({ type: UsuarioResponseDto, description: 'Usuario actualizado exitosamente' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUsuarioDto,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        const result = await this.authService.update(id, dto, user);
        return OkRes(res, { usuario: result });
    }

    @Delete('usuarios/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Superadmin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Eliminar un usuario permanentemente. Solo Superadmin.' })
    @ApiOkResponse({ description: 'Usuario eliminado exitosamente' })
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        await this.authService.delete(id, user);
        return OkRes(res, { message: 'Usuario eliminado exitosamente' });
    }
}
