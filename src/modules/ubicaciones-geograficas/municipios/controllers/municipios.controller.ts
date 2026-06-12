import { Controller, Get, Query, Res } from '@nestjs/common';
import { MunicipiosService } from '../services/municipios.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';
import { FilterMunicipiosDto } from '../dto/filter-municipios.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';

@ApiTags('Municipios')
@Controller('municipios')
export class MunicipiosController {
    constructor(private readonly municipiosService: MunicipiosService) {}

    @Get()
    @ApiOperation({ summary: 'Listar municipios con paginación y filtros opcionales' })
    @ApiOkResponse({ type: PaginationResponseDto, description: 'Listado paginado de municipios' })
    async findAll(@Query() params: FilterMunicipiosDto, @Res() res: Response) {
        const result = await this.municipiosService.findAllFiltered(params);
        return OkRes(res, result);
    }
}
