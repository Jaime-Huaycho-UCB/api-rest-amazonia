import { Controller, Get, Query, Res } from '@nestjs/common';
import { OrganizacionesService } from '../services/organizaciones.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/shared/utils';
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
}
