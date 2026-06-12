import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { ProyectosService } from '../services/proyectos.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes, SwaggerBadRequestCommon } from 'src/shared/utils';
import { FilterProyectosDto } from '../dto/filter-proyectos.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';

@ApiTags('Proyectos')
@Controller('proyectos')
export class ProyectosController {
    constructor(private readonly proyectosService: ProyectosService) {}

    @Get()
    @ApiOperation({ summary: 'Listar proyectos con paginación y filtros opcionales' })
    @ApiOkResponse({ type: PaginationResponseDto, description: 'Listado paginado de proyectos' })
    async findAll(@Query() params: FilterProyectosDto, @Res() res: Response) {
        const result = await this.proyectosService.findAll(params);
        return OkRes(res, result);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener detalle completo de un proyecto por ID, incluye localidades, especies, prácticas y áreas de desarrollo' })
    @ApiOkResponse({ description: 'Proyecto encontrado con todas sus relaciones' })
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const proyecto = await this.proyectosService.findOne(id);
        return OkRes(res, { proyecto });
    }
}
