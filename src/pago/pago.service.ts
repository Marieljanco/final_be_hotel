import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagoService {
  constructor(@InjectRepository(Pago) private pagosRepository: Repository<Pago>) {}

  // async create(createPagoDto: CreatePagoDto): Promise<Pago> {
  //   const pago = await this.pagosRepository.create(createPagoDto);
  //   return this.pagosRepository.save(pago);
  // }

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const existe = await this.pagosRepository.findOneBy({
      monto: createPagoDto.monto
    });

    if (existe) {
      throw new ConflictException('El pago ya existe');
    }

    return this.pagosRepository.save({
      monto: createPagoDto.monto,
      //nacionalidad: createPagoDto.nacionalidad.trim(),
    });
  }

  async findAll(): Promise<Pago[]> {
    return this.pagosRepository.find();
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagosRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException(`El pago con ID ${id} no existe`);
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);
    const pagoUpdate = Object.assign(pago, updatePagoDto);
    return this.pagosRepository.save(pagoUpdate);
  }

  async remove(id: number) {
    const cancion = await this.findOne(id);
    return this.pagosRepository.delete(cancion.id);
  }
}
