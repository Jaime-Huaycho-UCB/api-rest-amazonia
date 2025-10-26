import { Injectable } from '@nestjs/common';
import { CreateOrganizacionesEmpresaDto } from '../dto/create-organizaciones-empresa.dto';
import { UpdateOrganizacionesEmpresaDto } from '../dto/update-organizaciones-empresa.dto';

@Injectable()
export class OrganizacionesEmpresasService {
  create(createOrganizacionesEmpresaDto: CreateOrganizacionesEmpresaDto) {
    return 'This action adds a new organizacionesEmpresa';
  }

  findAll() {
    return `This action returns all organizacionesEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacionesEmpresa`;
  }

  update(id: number, updateOrganizacionesEmpresaDto: UpdateOrganizacionesEmpresaDto) {
    return `This action updates a #${id} organizacionesEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacionesEmpresa`;
  }
}
