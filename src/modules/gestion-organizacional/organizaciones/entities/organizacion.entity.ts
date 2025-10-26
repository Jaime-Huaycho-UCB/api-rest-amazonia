import { TipoOrganizacion } from 'src/modules/catalogos/tipos-organizaciones/entities/tipo-organizacion.entity';
import { ProyectoOrganizacion } from 'src/modules/gestion-proyectos/proyectos-organizaciones/entities/proyecto-organizacion.entity';
import { Departamento } from 'src/modules/ubicaciones-geograficas/departamentos/entities/departamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { OrganizacionEmpresa } from '../../organizaciones-empresas/entities/organizacion-empresa.entity';

@Entity('organizaciones')
export class Organizacion {
    @PrimaryGeneratedColumn({ name: 'id_organizacion' })
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ name: 'id_tipo' })
    idTipo: number;

    @Column({ name: 'id_departamento' })
    idDepartamento: number;

    @Column({ type: 'boolean' })
    esNacional: boolean;

    @Column({ type: 'int' })
    anioInicioTrabajo: number;

    @ManyToOne(() => TipoOrganizacion, (tipo) => tipo.organizaciones)
    @JoinColumn({ name: 'id_tipo' })
    tipo: TipoOrganizacion;

    @ManyToOne(() => Departamento, (departamento) => departamento.organizaciones)
    @JoinColumn({ name: 'id_departamento' })
    departamento: Departamento;

    @OneToMany(() => OrganizacionEmpresa, (orgEmpresa) => orgEmpresa.organizacion)
    organizacionesEmpresas: OrganizacionEmpresa[];

    @OneToMany(() => ProyectoOrganizacion, (proyectoOrg) => proyectoOrg.organizacion)
    proyectosOrganizaciones: ProyectoOrganizacion[];
}
