import { Injectable } from '@nestjs/common';
import { CreateActoresProyectoDto } from '../dto/create-actores-proyecto.dto';
import { UpdateActoresProyectoDto } from '../dto/update-actores-proyecto.dto';

@Injectable()
export class ActoresProyectosService {
  create(createActoresProyectoDto: CreateActoresProyectoDto) {
    return 'This action adds a new actoresProyecto';
  }

  findAll() {
    return `This action returns all actoresProyectos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actoresProyecto`;
  }

  update(id: number, updateActoresProyectoDto: UpdateActoresProyectoDto) {
    return `This action updates a #${id} actoresProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} actoresProyecto`;
  }
}
