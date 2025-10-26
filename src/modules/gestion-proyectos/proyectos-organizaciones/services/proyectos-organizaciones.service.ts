import { Injectable } from '@nestjs/common';
import { CreateProyectosOrganizacioneDto } from '../dto/create-proyectos-organizacione.dto';
import { UpdateProyectosOrganizacioneDto } from '../dto/update-proyectos-organizacione.dto';

@Injectable()
export class ProyectosOrganizacionesService {
  create(createProyectosOrganizacioneDto: CreateProyectosOrganizacioneDto) {
    return 'This action adds a new proyectosOrganizacione';
  }

  findAll() {
    return `This action returns all proyectosOrganizaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectosOrganizacione`;
  }

  update(id: number, updateProyectosOrganizacioneDto: UpdateProyectosOrganizacioneDto) {
    return `This action updates a #${id} proyectosOrganizacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectosOrganizacione`;
  }
}
