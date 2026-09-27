import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Injectable()
export class EstudiantesService {
  private estudiantes: Estudiante[] = [];

  create(createEstudianteDto: CreateEstudianteDto) {
    const existe = this.estudiantes.find(
      (e) => e.carnet === createEstudianteDto.carnet,
    );
    if (existe) {
      throw new ConflictException(
        `Ya existe un estudiante con el carnet ${createEstudianteDto.carnet}`,
      );
    }
    const nuevoEstudiante: Estudiante = { ...createEstudianteDto };
    this.estudiantes.push(nuevoEstudiante);
    return nuevoEstudiante;
  }

  findAll() {
    return this.estudiantes;
  }

  findOne(carnet: string) {
    const estudiante = this.estudiantes.find((e) => e.carnet === carnet);
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con carnet ${carnet} no encontrado`);
    }
    return estudiante;
  }

  // PUT - reemplazo completo
  replace(carnet: string, createEstudianteDto: CreateEstudianteDto) {
    const index = this.estudiantes.findIndex((e) => e.carnet === carnet);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con carnet ${carnet} no encontrado`);
    }
    const actualizado: Estudiante = { ...createEstudianteDto };
    this.estudiantes[index] = actualizado;
    return actualizado;
  }

  // PATCH - actualización parcial
  update(carnet: string, updateEstudianteDto: UpdateEstudianteDto) {
    const index = this.estudiantes.findIndex((e) => e.carnet === carnet);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con carnet ${carnet} no encontrado`);
    }
    this.estudiantes[index] = { ...this.estudiantes[index], ...updateEstudianteDto };
    return this.estudiantes[index];
  }

  remove(carnet: string) {
    const index = this.estudiantes.findIndex((e) => e.carnet === carnet);
    if (index === -1) {
      throw new NotFoundException(`Estudiante con carnet ${carnet} no encontrado`);
    }
    const [eliminado] = this.estudiantes.splice(index, 1);
    return eliminado;
  }
}
