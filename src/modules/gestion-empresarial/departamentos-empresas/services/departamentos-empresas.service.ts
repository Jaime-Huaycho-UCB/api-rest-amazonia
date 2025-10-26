import { Injectable } from '@nestjs/common';
import { CreateDepartamentosEmpresaDto } from '../dto/create-departamentos-empresa.dto';
import { UpdateDepartamentosEmpresaDto } from '../dto/update-departamentos-empresa.dto';

@Injectable()
export class DepartamentosEmpresasService {
  create(createDepartamentosEmpresaDto: CreateDepartamentosEmpresaDto) {
    return 'This action adds a new departamentosEmpresa';
  }

  findAll() {
    return `This action returns all departamentosEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} departamentosEmpresa`;
  }

  update(id: number, updateDepartamentosEmpresaDto: UpdateDepartamentosEmpresaDto) {
    return `This action updates a #${id} departamentosEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamentosEmpresa`;
  }
}
