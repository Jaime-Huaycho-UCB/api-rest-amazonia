import { Controller, Get, Query, Res } from '@nestjs/common';
import { ProyectosService } from '../services/proyectos.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';
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
}
