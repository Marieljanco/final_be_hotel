import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { UpdateHabitacionDto } from './dto/update-habitacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habitacion } from './entities/habitacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabitacionesService {
  constructor(
    @InjectRepository(Habitacion)
    private habitacionesRepository: Repository<Habitacion>,
  ) {}

  async create(createHabitacionDto: CreateHabitacionDto): Promise<Habitacion> {
    const { tipoHabitacion } = createHabitacionDto;
    const existe = await this.habitacionesRepository.findOne({ where: { tipoHabitacion } });

    if (existe) {
      throw new ConflictException('La habitación ya existe');
    }

    const nuevaHabitacion = this.habitacionesRepository.create(createHabitacionDto);
    return this.habitacionesRepository.save(nuevaHabitacion);
  }

  async findAll(): Promise<Habitacion[]> {
    return this.habitacionesRepository.find();
  }

  async findOne(id: number): Promise<Habitacion> {
    const habitacion = await this.habitacionesRepository.findOneBy({ id });
    if (!habitacion) {
      throw new NotFoundException(`La habitación ${id} no existe`);
    }
    return habitacion;
  }

  async update(id: number, updateHabitacionDto: UpdateHabitacionDto): Promise<Habitacion> {
    await this.findOne(id);
    await this.habitacionesRepository.update(id, updateHabitacionDto);
    return this.findOne(id); // Return updated habitacion
  }

  async remove(id: number): Promise<void> {
    const habitacion = await this.findOne(id);
    await this.habitacionesRepository.remove(habitacion);
  }
}
