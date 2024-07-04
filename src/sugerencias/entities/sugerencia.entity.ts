import { Cliente } from 'src/clientes/entities/cliente.entity';
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  ManyToOne, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity('sugerencias')
export class Sugerencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  comentario: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha: Date;

 
  @ManyToOne(() => Cliente, cliente => cliente.sugerencia)
  cliente: Cliente;

}


