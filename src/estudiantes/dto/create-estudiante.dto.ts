import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @IsNotEmpty()
  carnet: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  fechaNacimiento: string;

  @IsIn(['M', 'F'])
  sexo: string;
}