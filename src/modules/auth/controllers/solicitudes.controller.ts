import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SolicitudesService } from '../services/solicitudes.service';
import { CrearSolicitudDto } from '../dto/crear-solicitud.dto';
import { AprobarSolicitudDto } from '../dto/aprobar-solicitud.dto';
import { RechazarSolicitudDto } from '../dto/rechazar-solicitud.dto';
import { SolicitudResponseDto } from '../dto/solicitud-response.dto';
import { EstadoSolicitudEnum } from '../entities/solicitud-acceso.entity';
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

@ApiTags('Auth — Solicitudes de Acceso')
@Controller('auth')
export class SolicitudesController {
    constructor(private readonly solicitudesService: SolicitudesService) {}

    @Post('solicitar-acceso')
    @ApiOperation({ summary: 'Solicitar acceso como investigador (endpoint público)' })
    @ApiCreatedResponse({ description: 'Solicitud enviada exitosamente' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    @ApiConflictResponse(SwaggerConflictCommon())
    async solicitar(@Body() dto: CrearSolicitudDto, @Res() res: Response) {
        const result = await this.solicitudesService.crear(dto);
        return CreatedRes(res, result);
    }

    @Get('solicitudes')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Listar solicitudes de acceso con paginación y filtro por estado. Solo Admin+.' })
    @ApiQuery({
        name: 'estado',
        enum: EstadoSolicitudEnum,
        required: false,
        description: 'Filtrar por estado de la solicitud',
    })
    @ApiOkResponse({ type: PaginationResponseDto, description: 'Listado paginado de solicitudes' })
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    async findAll(
        @Query() params: PaginationParamsDto,
        @Query('estado') estado: EstadoSolicitudEnum | undefined,
        @Res() res: Response,
    ) {
        const result = await this.solicitudesService.findAll(params, estado);
        return OkRes(res, result);
    }

    @Patch('solicitudes/:id/aprobar')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Aprobar solicitud y crear usuario investigador. Solo Admin+.' })
    @ApiOkResponse({ description: 'Solicitud aprobada y usuario investigador creado' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    @ApiConflictResponse(SwaggerConflictCommon())
    async aprobar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AprobarSolicitudDto,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        const result = await this.solicitudesService.aprobar(id, dto, user);
        return OkRes(res, result);
    }

    @Patch('solicitudes/:id/rechazar')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RoleEnum.Admin)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Rechazar una solicitud de acceso. Solo Admin+.' })
    @ApiOkResponse({ description: 'Solicitud rechazada exitosamente' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    @ApiUnauthorizedResponse(SwaggerUnauthorizedCommon())
    @ApiForbiddenResponse(SwaggerForbiddenCommon())
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    async rechazar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: RechazarSolicitudDto,
        @CurrentUser() user: JwtPayload,
        @Res() res: Response,
    ) {
        const result = await this.solicitudesService.rechazar(id, dto, user);
        return OkRes(res, result);
    }
}
