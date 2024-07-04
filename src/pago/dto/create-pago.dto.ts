import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePagoDto {

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo monto no debe ser vacío' })
  @IsNumber({}, { message: 'El campo monto debe ser de tipo número' })
  readonly monto: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo metodo de pago no debe ser vacío' })
    @IsString({ message: 'El campo metodo de pago debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo metodo de pago no debe ser mayor a 100 caracteres' })
    @MinLength(2, { message: 'El campo metodo de pago no debe ser menor a 2 caracteres' })
    readonly metodo_de_pago: string;


}
