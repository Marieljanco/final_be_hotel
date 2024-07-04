import { Module } from '@nestjs/common';
import { SugerenciasService } from './sugerencias.service';
import { SugerenciasController } from './sugerencias.controller';
import { Sugerencia } from './entities/sugerencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sugerencia])],
  controllers: [SugerenciasController],
  providers: [SugerenciasService],
})
export class SugerenciasModule {}
