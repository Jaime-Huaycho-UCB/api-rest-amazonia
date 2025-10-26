import { Injectable } from '@nestjs/common';
import { CreateApoyosEmpresaDto } from '../dto/create-apoyos-empresa.dto';
import { UpdateApoyosEmpresaDto } from '../dto/update-apoyos-empresa.dto';

@Injectable()
export class ApoyosEmpresasService {
  create(createApoyosEmpresaDto: CreateApoyosEmpresaDto) {
    return 'This action adds a new apoyosEmpresa';
  }

  findAll() {
    return `This action returns all apoyosEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apoyosEmpresa`;
  }

  update(id: number, updateApoyosEmpresaDto: UpdateApoyosEmpresaDto) {
    return `This action updates a #${id} apoyosEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} apoyosEmpresa`;
  }
}
