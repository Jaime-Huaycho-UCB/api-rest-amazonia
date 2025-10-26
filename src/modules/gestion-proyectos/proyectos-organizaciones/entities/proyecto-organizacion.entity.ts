import { Organizacion } from "src/modules/gestion-organizacional/organizaciones/entities/organizacion.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Proyecto } from "../../proyectos/entities/proyecto.entity";

@Entity('proyectos_organizaciones')
export class ProyectoOrganizacion {
    @PrimaryColumn({ name: 'id_proyecto' })
    idProyecto: number;

    @PrimaryColumn({ name: 'id_organizacion' })
    idOrganizacion: number;

    @Column({ type: 'date', name: 'fecha_inicio' })
    fechaInicio: string;

    @Column({ type: 'date', name: 'fecha_fin', nullable: true })
    fechaFin?: string;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.proyectosOrganizaciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Proyecto;

    @ManyToOne(() => Organizacion, (organizacion) => organizacion.proyectosOrganizaciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_organizacion' })
    organizacion: Organizacion;
}