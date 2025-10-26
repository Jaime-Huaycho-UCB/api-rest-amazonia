import { Injectable } from '@nestjs/common';
import { CreateLocalidadesProyectoDto } from '../dto/create-localidades-proyecto.dto';
import { UpdateLocalidadesProyectoDto } from '../dto/update-localidades-proyecto.dto';

@Injectable()
export class LocalidadesProyectosService {
  create(createLocalidadesProyectoDto: CreateLocalidadesProyectoDto) {
    return 'This action adds a new localidadesProyecto';
  }

  findAll() {
    return `This action returns all localidadesProyectos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localidadesProyecto`;
  }

  update(id: number, updateLocalidadesProyectoDto: UpdateLocalidadesProyectoDto) {
    return `This action updates a #${id} localidadesProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} localidadesProyecto`;
  }
}
