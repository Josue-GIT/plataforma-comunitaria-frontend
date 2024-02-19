import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { EventoService } from 'src/app/service/evento/evento.service';
import { Evento } from 'src/app/service/model/Evento';
import { ParticipacionEventoService } from 'src/app/service/participacionEvento/participacion-evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  loggedInUserId: number | null = null;

  constructor(private eventoService: EventoService,
    private authService: AuthService,
    private participacionEventoService: ParticipacionEventoService) { }

  ngOnInit(): void {
    this.cargarEventos();
    this.loggedInUserId = this.authService.getLoggedInUserId();
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
  confirmarParticipacion(evento: Evento): void {
    Swal.fire({
      title: '¿Seguro que quieres participar en el evento?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participacionEventoService.guardarParticipacion(evento.id, this.loggedInUserId!).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Participación en evento guardada exitosamente!',
              html: 'Puedes ver los eventos en los que estás participando en tu perfil',
              confirmButtonText: 'Aceptar'
            });
            this.cargarEventos(); // Recargar los eventos después de guardar la participación
          },
          (error: any) => {
            if (error.error === 'El usuario ya está participando en este evento') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El usuario ya está registrado en este evento.',
                confirmButtonText: 'Aceptar'
              });
            } else {
              console.error('Error al guardar la participación en el evento:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al guardar la participación en el evento. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        );
      }
    });
  }
}