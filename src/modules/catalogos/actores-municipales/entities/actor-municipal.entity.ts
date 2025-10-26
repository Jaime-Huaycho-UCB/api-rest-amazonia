import { ActorProyecto } from 'src/modules/gestion-proyectos/actores-proyectos/entities/actor-proyecto.entity';
import { Proyecto } from 'src/modules/gestion-proyectos/proyectos/entities/proyecto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity('actores_municipales')
export class ActorMunicipal {
    @PrimaryGeneratedColumn({ name: 'id_actor' })
    id: number;

    @Column({ name: 'nombre', type: 'varchar', length: 150 })
    nombre: string;

    @Column({ name: 'es_activo', type: 'boolean', default: true })
    esActivo: boolean;

    @OneToMany(() => ActorProyecto, (actorProyecto) => actorProyecto.actor)
    ActoresProyectos: ActorProyecto[];

    @ManyToMany(() => Proyecto,(proyecto) => proyecto.actoresMunicipales)
    proyectos: Proyecto[]
}
