import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { CursosModule } from './cursos/cursos.module';

@Module({
  imports: [EstudiantesModule, CursosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
