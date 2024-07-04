import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly serviciosRepository: Repository<Servicio>,
  ) {}

  async create(createServicioDto: CreateServicioDto): Promise<Servicio> {
    const existe = await this.serviciosRepository.findOne({
      where: { descripcion: createServicioDto.descripcion.trim() },
    });

    if (existe) {
      throw new ConflictException('El servicio ya existe');
    }

    const servicio = this.serviciosRepository.create(createServicioDto);
    return this.serviciosRepository.save(servicio);
  }

  findAll(): Promise<Servicio[]> {
    return this.serviciosRepository.find();
  }

  async findOne(id: number): Promise<Servicio> {
    const servicio = await this.serviciosRepository.findOneBy({ id });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto): Promise<Servicio> {
    const servicio = await this.findOne(id);
    Object.assign(servicio, updateServicioDto);
    return this.serviciosRepository.save(servicio);
  }

  async remove(id: number) {
    const servicio = await this.findOne(id);
    return this.serviciosRepository.delete(servicio.id);
  }
}
