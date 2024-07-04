import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({ example: '2024-04-13' })
  @IsNotEmpty({ message: 'El campo fecha_entrada no debe ser vacío' })
  @IsDateString({}, { message: 'El campo fecha_entrada debe ser de tipo fecha' })
  readonly fecha_entrada: Date;

  @ApiProperty({ example: '2024-04-13' })
  @IsNotEmpty({ message: 'El campo fecha_salida no debe ser vacío' })
  @IsDateString({}, { message: 'El campo fecha_salida debe ser de tipo fecha' })
  readonly fecha_salida: Date;

  // @ApiProperty()
  // @IsNotEmpty({ message: 'El campo estado no debe ser vacío' })
  // @IsString({ message: 'El campo estado debe ser de tipo cadena' })
  // @MaxLength(30, { message: 'El campo estado no debe ser mayor a 50 caracteres' })
  // @MinLength(2, { message: 'El campo estado no debe ser menor a 2 caracteres' })
  // readonly estado: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo idCliente debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser de tipo numérico' })
  readonly idCliente: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idHabitacion debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser de tipo numérico' })
  readonly idHabitacion: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idHabitacion debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser de tipo numérico' })
  readonly idServicio: number;
}
