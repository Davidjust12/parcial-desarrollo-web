import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@Injectable()
export class CursosService {
  private cursos: Curso[] = [];

  create(createCursoDto: CreateCursoDto) {
    const existe = this.cursos.find((c) => c.codigo === createCursoDto.codigo);
    if (existe) {
      throw new ConflictException(
        `Ya existe un curso con el código ${createCursoDto.codigo}`,
      );
    }
    const nuevoCurso: Curso = { ...createCursoDto };
    this.cursos.push(nuevoCurso);
    return nuevoCurso;
  }

  findAll() {
    return this.cursos;
  }

  findOne(codigo: string) {
    const curso = this.cursos.find((c) => c.codigo === codigo);
    if (!curso) {
      throw new NotFoundException(`Curso con código ${codigo} no encontrado`);
    }
    return curso;
  }

  // PUT - reemplazo completo
  replace(codigo: string, createCursoDto: CreateCursoDto) {
    const index = this.cursos.findIndex((c) => c.codigo === codigo);
    if (index === -1) {
      throw new NotFoundException(`Curso con código ${codigo} no encontrado`);
    }
    const actualizado: Curso = { ...createCursoDto };
    this.cursos[index] = actualizado;
    return actualizado;
  }

  // PATCH - actualización parcial
  update(codigo: string, updateCursoDto: UpdateCursoDto) {
    const index = this.cursos.findIndex((c) => c.codigo === codigo);
    if (index === -1) {
      throw new NotFoundException(`Curso con código ${codigo} no encontrado`);
    }
    this.cursos[index] = { ...this.cursos[index], ...updateCursoDto };
    return this.cursos[index];
  }

  remove(codigo: string) {
    const index = this.cursos.findIndex((c) => c.codigo === codigo);
    if (index === -1) {
      throw new NotFoundException(`Curso con código ${codigo} no encontrado`);
    }
    const [eliminado] = this.cursos.splice(index, 1);
    return eliminado;
  }
}