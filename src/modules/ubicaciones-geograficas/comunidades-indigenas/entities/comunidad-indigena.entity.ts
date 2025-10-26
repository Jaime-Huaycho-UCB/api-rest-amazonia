import { LocalidadProyecto } from "src/modules/gestion-proyectos/localidades-proyectos/entities/localidad-proyecto.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Municipio } from "../../municipios/entities/municipio.entity";

@Entity('comunidades_indigenas')
export class ComunidadIndigena {
    @PrimaryGeneratedColumn({ name: 'id_comunidad' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ name: 'id_municipio' })
    idMunicipio: number;

    @ManyToOne(() => Municipio, (municipio) => municipio.comunidadesIndigenas)
    @JoinColumn({ name: 'id_municipio' })
    municipio: Municipio;

    @OneToMany(() => LocalidadProyecto, (localidadProyecto) => localidadProyecto.comunidad)
    localidadesProyectos: LocalidadProyecto[];
}