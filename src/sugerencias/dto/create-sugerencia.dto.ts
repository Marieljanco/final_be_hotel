import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSugerenciaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo comentario no debe ser vacío' })
  @IsString({ message: 'El campo comentario debe ser de tipo cadena' })
  readonly comentario: string;
}
