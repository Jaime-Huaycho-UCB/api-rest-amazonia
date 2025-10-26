import { Injectable } from '@nestjs/common';
import { CreateOdsEmpresaDto } from '../dto/create-ods-empresa.dto';
import { UpdateOdsEmpresaDto } from '../dto/update-ods-empresa.dto';

@Injectable()
export class OdsEmpresasService {
  create(createOdsEmpresaDto: CreateOdsEmpresaDto) {
    return 'This action adds a new odsEmpresa';
  }

  findAll() {
    return `This action returns all odsEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} odsEmpresa`;
  }

  update(id: number, updateOdsEmpresaDto: UpdateOdsEmpresaDto) {
    return `This action updates a #${id} odsEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} odsEmpresa`;
  }
}
