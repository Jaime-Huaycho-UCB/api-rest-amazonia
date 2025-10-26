import { Injectable } from '@nestjs/common';
import { CreateProyectosEmpresaDto } from '../dto/create-proyectos-empresa.dto';
import { UpdateProyectosEmpresaDto } from '../dto/update-proyectos-empresa.dto';

@Injectable()
export class ProyectosEmpresasService {
  create(createProyectosEmpresaDto: CreateProyectosEmpresaDto) {
    return 'This action adds a new proyectosEmpresa';
  }

  findAll() {
    return `This action returns all proyectosEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectosEmpresa`;
  }

  update(id: number, updateProyectosEmpresaDto: UpdateProyectosEmpresaDto) {
    return `This action updates a #${id} proyectosEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectosEmpresa`;
  }
}
