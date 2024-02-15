import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Proyecto } from 'src/app/service/model/Proyecto';
import { ProyectoService } from 'src/app/service/proyecto/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  proyectos: Proyecto[] = [];

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.cargarQuejas();
  }

  cargarQuejas(): void {
    this.proyectoService.obtenerProyectos().subscribe(
      (data: Proyecto[]) => {
        this.proyectos = data;
      },
      (error) => {
        console.error('Error al obtener quejas:', error);
      }
    );
  }

  abrirGoogleMaps(ubicacion: string): void {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}`;
    window.open(googleMapsUrl, '_blank');

  }
}
