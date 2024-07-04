import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSugerenciaDto } from './dto/create-sugerencia.dto';
import { UpdateSugerenciaDto } from './dto/update-sugerencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sugerencia } from './entities/sugerencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SugerenciasService {
  constructor(
    @InjectRepository(Sugerencia) private sugerenciasRepository: Repository<Sugerencia>,
  ) {}

  async create(createSugerenciaDto: CreateSugerenciaDto): Promise<Sugerencia> {
    const existe = await this.sugerenciasRepository.findOneBy({
      comentario: createSugerenciaDto.comentario,
    });

    if (existe) {
      throw new ConflictException('La sugerencia ya existe');
    }

    return this.sugerenciasRepository.save({
      comentario: createSugerenciaDto.comentario,
    });
  }

  async findAll(): Promise<Sugerencia[]> {
    return this.sugerenciasRepository.find();
  }

  async findOne(id: number): Promise<Sugerencia> {
    const sugerencia = await this.sugerenciasRepository.findOneBy({ id });
    if (!sugerencia) {
      throw new NotFoundException(`La sugerencia con ID ${id} no existe`);
    }
    return sugerencia;
  }

  async update(id: number, updateSugerenciaDto: UpdateSugerenciaDto): Promise<Sugerencia> {
    const sugerencia = await this.findOne(id);
    const sugerenciaUpdate = Object.assign(sugerencia, updateSugerenciaDto);
    return this.sugerenciasRepository.save(sugerenciaUpdate);
  }

  async remove(id: number): Promise<void> {
    const sugerencia = await this.findOne(id);
    await this.sugerenciasRepository.remove(sugerencia);
  }
}
