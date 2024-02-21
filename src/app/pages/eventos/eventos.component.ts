import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { EventoService } from 'src/app/service/evento/evento.service';
import { Evento } from 'src/app/service/model/Evento';
import { ParticipacionEventoService } from 'src/app/service/participacionEvento/participacion-evento.service';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' })),
      ]),
    ]),
  ],
})

export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  eventosPaginados: Evento[] = [];
  loggedInUserId: number | null = null;
  userRole: string | null = null;

  constructor(private eventoService: EventoService,
    private authService: AuthService,
    private participacionEventoService: ParticipacionEventoService) { }

  ngOnInit(): void {
    this.cargarEventos();
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
    this.eventoService.obtenerEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data;
        this.eventosPaginados = this.eventos.slice(0, 6); // Mostrar los primeros 6 eventos por defecto
        this.verificarParticipacionUsuario();
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  cargarEventos(): void {
    this.eventoService.obtenerEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data;
        this.verificarParticipacionUsuario();
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
  verificarParticipacionUsuario(): void {
    this.eventos.forEach(evento => {
      this.participacionEventoService.obtenerParticipantesDelEvento(evento.id).subscribe(
        (participantes: any[]) => {
          evento.participantes = participantes;
        },
        (error) => {
          console.error('Error al obtener participantes del evento:', error);
        }
      );
    });
  }
  usuarioRegistradoEnEvento(evento: Evento): boolean {
    if (!evento.participantes) {
      return false; // Si no hay participantes, el usuario no está registrado
    }
    // Verificar si el usuario actual está en la lista de participantes del evento
    return evento.participantes.some(participante => participante.usuario.id === this.loggedInUserId);
  }

  cancelarParticipacion(evento: Evento): void {
    Swal.fire({
      title: '¿Seguro que quieres cancelar tu participación en el evento?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participacionEventoService.cancelarParticipacion(evento.id, this.loggedInUserId!).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Participación en evento cancelada exitosamente!',
              confirmButtonText: 'Aceptar'
            });
            this.cargarEventos(); // Recargar los eventos después de cancelar la participación
          },
          (error: any) => {
            console.error('Error al cancelar la participación en el evento:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al cancelar la participación en el evento. Por favor, inténtalo de nuevo más tarde.',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  onPaginateChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.eventos.length);
    this.eventosPaginados = this.eventos.slice(startIndex, endIndex);
  }
}