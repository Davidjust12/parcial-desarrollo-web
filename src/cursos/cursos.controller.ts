import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.cursosService.findOne(codigo);
  }

  @Put(':codigo')
  replace(
    @Param('codigo') codigo: string,
    @Body() createCursoDto: CreateCursoDto,
  ) {
    return this.cursosService.replace(codigo, createCursoDto);
  }

  @Patch(':codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateCursoDto: UpdateCursoDto,
  ) {
    return this.cursosService.update(codigo, updateCursoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: string) {
    return this.cursosService.remove(codigo);
  }
}