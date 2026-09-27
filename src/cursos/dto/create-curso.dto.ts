import { IsString, IsNotEmpty, IsInt, IsArray, Min } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsInt()
  @Min(1)
  semestre: number;

  @IsArray()
  @IsString({ each: true })
  prerequisitos: string[];

  @IsInt()
  @Min(0)
  creditos: number;
}