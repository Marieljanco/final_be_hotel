import { Reserva } from 'src/reservas/entities/reserva.entity';
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  OneToOne,
  OneToMany
} from 'typeorm';

@Entity('habitaciones')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, nullable: false })
  tipoHabitacion: string;

  @Column('varchar', { length: 100, nullable: false })
  estado_de_disponibilidad: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  precio_por_hora: number;

//reserva habitacion
  @OneToMany(() => Reserva, reserva => reserva.habitacion)
  reserva: Reserva[];
  //servi habi
  // @ManyToMany(() => Servicios, servicios => servicios.habitacion)
  // @JoinTable(/*{ name: 'id_habitacion', referencedColumnName: 'id' }*/ )
  // servicio: Servicios;
}
