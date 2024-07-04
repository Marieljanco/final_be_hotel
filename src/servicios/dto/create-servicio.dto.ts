import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateServicioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre_del_servicio no debe ser vacío' })
  @IsString({ message: 'El campo nombre_del_servicio debe ser de tipo cadena' })
  @MaxLength(40, { message: 'El campo nombre_del_servicio no debe ser mayor a 40 caracteres' })
  @MinLength(2, { message: 'El campo nombre_del_servicio no debe ser menor a 2 caracteres' })
  readonly nombre_del_servicio: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo descripcion no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo descripcion no debe ser menor a 2 caracteres' })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio no debe ser vacío' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numérico' })
  readonly precio: number;
}
