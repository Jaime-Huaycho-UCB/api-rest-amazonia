import { Injectable } from '@nestjs/common';
import { CreateTiposOrganizacioneDto } from '../dto/create-tipos-organizacione.dto';
import { UpdateTiposOrganizacioneDto } from '../dto/update-tipos-organizacione.dto';

@Injectable()
export class TiposOrganizacionesService {
  create(createTiposOrganizacioneDto: CreateTiposOrganizacioneDto) {
    return 'This action adds a new tiposOrganizacione';
  }

  findAll() {
    return `This action returns all tiposOrganizaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tiposOrganizacione`;
  }

  update(id: number, updateTiposOrganizacioneDto: UpdateTiposOrganizacioneDto) {
    return `This action updates a #${id} tiposOrganizacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} tiposOrganizacione`;
  }
}
