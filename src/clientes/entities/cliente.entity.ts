import { Reserva } from 'src/reservas/entities/reserva.entity';
import { Sugerencia } from 'src/sugerencias/entities/sugerencia.entity';
import { 
  Column, 
  Entity, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column('varchar', { length: 15, nullable: false })
  // ci: string;
  @Column('int', { nullable: false })
  ci: number;

  @Column('varchar', { length: 50, nullable: false })
  nombre: string;

  @Column('varchar', { length: 100, nullable: false })
  apellido: string;

  @Column('int', { nullable: false })
  telefono: number;
  
  //reserva- cliente
  @OneToMany(() => Reserva, reserva => reserva.cliente)
  reserva: Reserva[];

  @OneToMany(() => Sugerencia, sugerencia => sugerencia.cliente)
  sugerencia: Sugerencia[];

}
