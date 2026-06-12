import { Controller, Get, Query, Res } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';
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
}
