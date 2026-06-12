import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { OrganizacionesService } from '../services/organizaciones.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes, SwaggerNotFoundCommon } from 'src/shared/utils';
import { FilterOrganizacionesDto } from '../dto/filter-organizaciones.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';

@ApiTags('Organizaciones')
@Controller('organizaciones')
export class OrganizacionesController {
    constructor(private readonly organizacionesService: OrganizacionesService) {}

    @Get()
    @ApiOperation({ summary: 'Listar organizaciones con paginación y filtros opcionales' })
    @ApiOkResponse({ type: PaginationResponseDto, description: 'Listado paginado de organizaciones' })
    async findAll(@Query() params: FilterOrganizacionesDto, @Res() res: Response) {
        const result = await this.organizacionesService.findAll(params);
        return OkRes(res, result);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener detalle completo de una organización por ID' })
    @ApiOkResponse({ description: 'Organización encontrada con todas sus relaciones' })
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const organizacion = await this.organizacionesService.findOne(id);
        return OkRes(res, { organizacion });
    }
}
