import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationParamsDto } from 'src/shared/dto/pagination-params.dto';

export class FilterDepartamentosDto extends PaginationParamsDto {
    @ApiPropertyOptional({
        description: 'Filtrar solo departamentos amazónicos (true) o todos (omitir/false)',
        type: Boolean,
        example: true,
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean({ message: "El parámetro 'amazonico' debe ser true o false" })
    amazonico?: boolean;
}
