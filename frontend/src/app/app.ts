import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:900px;margin:20px auto;font-family:sans-serif;">
      <h1>Universidad Mariano Gálvez</h1>

      <h2>Estudiantes</h2>
      <form (ngSubmit)="crearEstudiante()">
        <input [(ngModel)]="nuevoEstudiante.carnet" name="carnet" placeholder="Carnet" required>
        <input [(ngModel)]="nuevoEstudiante.nombres" name="nombres" placeholder="Nombres" required>
        <input [(ngModel)]="nuevoEstudiante.apellidos" name="apellidos" placeholder="Apellidos" required>
        <input [(ngModel)]="nuevoEstudiante.fechaNacimiento" name="fechaNacimiento" placeholder="YYYY-MM-DD" required>
        <select [(ngModel)]="nuevoEstudiante.sexo" name="sexo" required>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
        <button type="submit">Agregar</button>
      </form>

      <table border="1" cellpadding="6" style="width:100%;margin-top:10px;">
        <tr><th>Carnet</th><th>Nombres</th><th>Apellidos</th><th>Nacimiento</th><th>Sexo</th><th></th></tr>
        <tr *ngFor="let e of estudiantes">
          <td>{{e.carnet}}</td><td>{{e.nombres}}</td><td>{{e.apellidos}}</td>
          <td>{{e.fechaNacimiento}}</td><td>{{e.sexo}}</td>
          <td><button (click)="eliminarEstudiante(e.carnet)">Eliminar</button></td>
        </tr>
      </table>

      <h2>Cursos</h2>
      <form (ngSubmit)="crearCurso()">
        <input [(ngModel)]="nuevoCurso.codigo" name="codigo" placeholder="Codigo" required>
        <input [(ngModel)]="nuevoCurso.nombre" name="nombre" placeholder="Nombre" required>
        <input [(ngModel)]="nuevoCurso.descripcion" name="descripcion" placeholder="Descripcion" required>
        <input [(ngModel)]="nuevoCurso.semestre" name="semestre" type="number" placeholder="Semestre" required>
        <input [(ngModel)]="nuevoCurso.creditos" name="creditos" type="number" placeholder="Creditos" required>
        <button type="submit">Agregar</button>
      </form>

      <table border="1" cellpadding="6" style="width:100%;margin-top:10px;">
        <tr><th>Codigo</th><th>Nombre</th><th>Descripcion</th><th>Semestre</th><th>Creditos</th><th></th></tr>
        <tr *ngFor="let c of cursos">
          <td>{{c.codigo}}</td><td>{{c.nombre}}</td><td>{{c.descripcion}}</td>
          <td>{{c.semestre}}</td><td>{{c.creditos}}</td>
          <td><button (click)="eliminarCurso(c.codigo)">Eliminar</button></td>
        </tr>
      </table>
    </div>
  `,
})
export class App implements OnInit {
  estudiantes: any[] = [];
  cursos: any[] = [];

  nuevoEstudiante: any = { carnet: '', nombres: '', apellidos: '', fechaNacimiento: '', sexo: 'M' };
  nuevoCurso: any = { codigo: '', nombre: '', descripcion: '', semestre: 1, prerequisitos: [], creditos: 0 };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.cargarEstudiantes();
    this.cargarCursos();
  }

  cargarEstudiantes() {
    this.api.getEstudiantes().subscribe((data) => (this.estudiantes = data));
  }
  crearEstudiante() {
    this.api.crearEstudiante(this.nuevoEstudiante).subscribe(() => {
      this.cargarEstudiantes();
      this.nuevoEstudiante = { carnet: '', nombres: '', apellidos: '', fechaNacimiento: '', sexo: 'M' };
    });
  }
  eliminarEstudiante(carnet: string) {
    this.api.eliminarEstudiante(carnet).subscribe(() => this.cargarEstudiantes());
  }

  cargarCursos() {
    this.api.getCursos().subscribe((data) => (this.cursos = data));
  }
  crearCurso() {
    this.api.crearCurso(this.nuevoCurso).subscribe(() => {
      this.cargarCursos();
      this.nuevoCurso = { codigo: '', nombre: '', descripcion: '', semestre: 1, prerequisitos: [], creditos: 0 };
    });
  }
  eliminarCurso(codigo: string) {
    this.api.eliminarCurso(codigo).subscribe(() => this.cargarCursos());
  }
}