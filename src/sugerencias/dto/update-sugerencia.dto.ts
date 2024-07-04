import { PartialType } from '@nestjs/swagger';
import { CreateSugerenciaDto } from './create-sugerencia.dto';

export class UpdateSugerenciaDto extends PartialType(CreateSugerenciaDto) {}
