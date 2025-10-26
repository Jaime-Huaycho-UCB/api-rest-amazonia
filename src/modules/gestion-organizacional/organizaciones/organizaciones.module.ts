import { Module } from '@nestjs/common';
import { OrganizacionesService } from './services/organizaciones.service';
import { OrganizacionesController } from './controllers/organizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizacion } from './entities/organizacion.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Organizacion])
	],
	controllers: [OrganizacionesController],
	providers: [OrganizacionesService],
})
export class OrganizacionesModule { }
