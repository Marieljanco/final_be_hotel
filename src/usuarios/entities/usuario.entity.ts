
import { 
  BeforeInsert,
  BeforeUpdate,
  Column, 
  Entity, 
  OneToMany, 
  OneToOne, 
  PrimaryGeneratedColumn 
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Reserva } from 'src/reservas/entities/reserva.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 12, nullable: false })
  usuario: string;

  @Column('varchar', { length: 100, nullable: false })
  clave: string;

  @Column('varchar', { length: 50, nullable: false })
  email: string;

  @Column('varchar', { length: 30, nullable: false })
  tipoUsuario: string;
  
  @OneToMany(() => Reserva, reserva => reserva.usuarios)
  reservas: Reserva[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.clave = await bcrypt.hash(this.clave, salt);
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.clave);
  }
}
