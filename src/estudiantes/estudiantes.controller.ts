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
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':carnet')
  findOne(@Param('carnet') carnet: string) {
    return this.estudiantesService.findOne(carnet);
  }

  @Put(':carnet')
  replace(
    @Param('carnet') carnet: string,
    @Body() createEstudianteDto: CreateEstudianteDto,
  ) {
    return this.estudiantesService.replace(carnet, createEstudianteDto);
  }

  @Patch(':carnet')
  update(
    @Param('carnet') carnet: string,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudiantesService.update(carnet, updateEstudianteDto);
  }

  @Delete(':carnet')
  remove(@Param('carnet') carnet: string) {
    return this.estudiantesService.remove(carnet);
  }
}