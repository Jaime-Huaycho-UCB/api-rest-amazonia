import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes, SwaggerNotFoundCommon } from 'src/shared/utils';
import { FilterEmpresasDto } from '../dto/filter-empresas.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresasController {
    constructor(private readonly empresasService: EmpresasService) {}

    @Get()
    @ApiOperation({ summary: 'Listar empresas con paginación y filtros opcionales' })
    @ApiOkResponse({ type: PaginationResponseDto, description: 'Listado paginado de empresas' })
    async findAll(@Query() params: FilterEmpresasDto, @Res() res: Response) {
        const result = await this.empresasService.findAll(params);
        return OkRes(res, result);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener detalle completo de una empresa por ID' })
    @ApiOkResponse({ description: 'Empresa encontrada con todas sus relaciones' })
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const empresa = await this.empresasService.findOne(id);
        return OkRes(res, { empresa });
    }
}
