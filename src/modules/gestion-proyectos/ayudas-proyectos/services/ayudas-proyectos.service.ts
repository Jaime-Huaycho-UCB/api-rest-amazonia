import { Injectable } from '@nestjs/common';
import { CreateAyudasProyectoDto } from '../dto/create-ayudas-proyecto.dto';
import { UpdateAyudasProyectoDto } from '../dto/update-ayudas-proyecto.dto';

@Injectable()
export class AyudasProyectosService {
  create(createAyudasProyectoDto: CreateAyudasProyectoDto) {
    return 'This action adds a new ayudasProyecto';
  }

  findAll() {
    return `This action returns all ayudasProyectos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ayudasProyecto`;
  }

  update(id: number, updateAyudasProyectoDto: UpdateAyudasProyectoDto) {
    return `This action updates a #${id} ayudasProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} ayudasProyecto`;
  }
}
