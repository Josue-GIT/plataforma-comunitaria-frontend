import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EventoService } from 'src/app/service/evento/evento.service';
import { Evento } from 'src/app/service/model/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {
  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.obtenerEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }
  formatParticipantes(participantes: any[]): string {
    return participantes.map(participante => participante.usuario.nombre).join(', ');
  }
  abrirGoogleMaps(ubicacion: string): void {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}`;
    window.open(googleMapsUrl, '_blank');

  }
}