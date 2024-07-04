import { Reserva } from 'src/reservas/entities/reserva.entity';
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha: Date;

  @Column({type: 'enum', 
    enum: ['efectivo', 'tarjeta_credito', 'transferencia_bancaria'],
    default: 'efectivo'})
  metodo_de_pago: string;

  //pago reserva 1 a 1
  @OneToOne(() => Reserva, reserva => reserva.pago)
  reserva: Reserva;

}

