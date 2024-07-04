import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Habitacion } from 'src/habitaciones/entities/habitacion.entity';
import { Pago } from 'src/pago/entities/pago.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'fecha_reserva' })
  fecha_reserva: Date;

  @Column('date', { name: 'fecha_entrada' })
  fecha_entrada: Date;

  @Column('date', { name: 'fecha_salida' })
  fecha_salida: Date;

  // @Column('varchar', { length: 100 })
  // estado: string;
  // @Column('varchar', { length: 100 })
  // @IsNotEmpty()
  // @IsIn(['activo', 'cancelado', 'pendiente']) // Ejemplo de validación de estado permitido
  // estado: string;

  @ManyToOne(() => Cliente, cliente => cliente.reserva)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(() => Habitacion, habitacion => habitacion.reserva)
  @JoinColumn({ name: 'numero_habitacion' })
  habitacion: Habitacion;

  //pago reserva 1 a 1
  @OneToOne(() => Pago, pago => pago.reserva)
  @JoinColumn()
  pago: Pago;

  @ManyToMany(() => Servicio, servicio => servicio.reservas)
  @JoinTable({
    name: 'reserva_servicio',
    joinColumn: { name: 'reserva_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'servicio_id', referencedColumnName: 'id' },
  })
  servicios: Servicio[];

  @ManyToOne(() => Usuario, usuario => usuario.reservas)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuarios: Usuario;
}
