import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  nombre_del_servicio: string;

  @Column('varchar', { length: 100, nullable: false })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  precio: number;

  // @ManyToMany(() => Habitacion, habitacion => habitacion.servicio)
  // @JoinTable(/*{ name: 'id_habitacion', referencedColumnName: 'id' }*/ )
  // habitacion: Habitacion;

  @ManyToMany(() => Reserva, reserva => reserva.servicios)
  reservas: Reserva[];
}
