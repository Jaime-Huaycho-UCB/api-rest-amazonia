import { Injectable } from '@nestjs/common';
import { CreateTiposProyectoDto } from '../dto/create-tipos-proyecto.dto';
import { UpdateTiposProyectoDto } from '../dto/update-tipos-proyecto.dto';

@Injectable()
export class TiposProyectosService {
  create(createTiposProyectoDto: CreateTiposProyectoDto) {
    return 'This action adds a new tiposProyecto';
  }

  findAll() {
    return `This action returns all tiposProyectos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposProyecto`;
  }

  update(id: number, updateTiposProyectoDto: UpdateTiposProyectoDto) {
    return `This action updates a #${id} tiposProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposProyecto`;
  }
}
