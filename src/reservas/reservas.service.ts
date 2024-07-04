import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const existe = await this.reservaRepository.findOne({
      where: {
        cliente: { id: createReservaDto.idCliente },
        habitacion: { id: createReservaDto.idHabitacion }, // Verifica si el cliente ya tiene una reserva en la fecha dada
        fecha_entrada: createReservaDto.fecha_entrada,
        fecha_salida: createReservaDto.fecha_salida,
      },
    });

    if (existe) {
      throw new ConflictException('El cliente ya tiene una reserva para esta fecha');
    }

    const reserva = this.reservaRepository.create(createReservaDto);
    return this.reservaRepository.save(reserva);
  }
  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({
      relations: ['cliente', 'habitacion', 'pago', 'servicios', 'usuarios'],
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['cliente', 'habitacion', 'pago', 'servicios', 'usuarios'],
    });

    if (!reserva) {
      throw new NotFoundException(`La reserva con ID ${id} no existe`);
    }
    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);
    Object.assign(reserva, updateReservaDto);
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
  }
}
