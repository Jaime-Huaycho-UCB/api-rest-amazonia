import { Injectable } from '@nestjs/common';
import { CreateMotivosEmpresaDto } from '../dto/create-motivos-empresa.dto';
import { UpdateMotivosEmpresaDto } from '../dto/update-motivos-empresa.dto';

@Injectable()
export class MotivosEmpresasService {
  create(createMotivosEmpresaDto: CreateMotivosEmpresaDto) {
    return 'This action adds a new motivosEmpresa';
  }

  findAll() {
    return `This action returns all motivosEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} motivosEmpresa`;
  }

  update(id: number, updateMotivosEmpresaDto: UpdateMotivosEmpresaDto) {
    return `This action updates a #${id} motivosEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} motivosEmpresa`;
  }
}
