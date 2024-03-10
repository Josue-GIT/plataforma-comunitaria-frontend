import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { EventoService } from 'src/app/service/evento/evento.service';
import { Evento } from 'src/app/service/model/Evento';
import { ParticipacionEventoService } from 'src/app/service/participacionEvento/participacion-evento.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { AgregarEventoComponent } from 'src/app/modal-pages/parte-evento/agregar-evento/agregar-evento.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarEventoComponent } from 'src/app/modal-pages/parte-evento/editar-evento/editar-evento.component';

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
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1 })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})

export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  eventosPaginados: Evento[] = [];
  loggedInUserId: number | null = null;
  userRole: string | null = null;
  modalAbierto: boolean = false;
  currentPageIndex: number = 0;
  primerCargaCompleta: boolean = false;


  constructor(private eventoService: EventoService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private participacionEventoService: ParticipacionEventoService,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.loggedInUserId = this.authService.getLoggedInUserId();
      this.authService.getUserRole().subscribe(role => {
        this.userRole = role;
      });
      this.eventoService.obtenerEventos().subscribe(
        (data: Evento[]) => {
          this.eventos = data;
          this.eventosPaginados = this.eventos.slice(0, 6); // Inicializar eventosPaginados
          this.verificarParticipacionUsuario();
          this.primerCargaCompleta = true; // Marcar la primera carga como completa
        },
        (error) => {
          console.error('Error al obtener eventos:', error);
        }
      );
    }

    dataToImage(dataURI: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
    }

    cargarEventos(): void {
    this.eventoService.obtenerEventos().subscribe(
      (data: Evento[]) => {
        this.eventos = data;
        this.eventosPaginados = this.eventos.slice(this.currentPageIndex * 6, (this.currentPageIndex + 1) * 6);
        this.verificarParticipacionUsuario();
        
      }
      ,
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
            this.cargarEventos();
             // Recargar los eventos después de guardar la participación
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
    this.currentPageIndex = event.pageIndex;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = Math.min(startIndex + event.pageSize, this.eventos.length);
    const nuevosEventos = this.eventos.slice(startIndex, endIndex);

    // Agregar un retardo a la animación de los eventos que aparecen
    setTimeout(() => {
      this.eventosPaginados = nuevosEventos;
    }, 500); // 500ms de retardo, ajusta el tiempo según tus necesidades
  }

  registrarEvento() {
    const dialogRef = this.dialog.open(AgregarEventoComponent, {
      width: '900px', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de eventos se cerró');
      this.cargarEventos();
    });
  }
  cerrarModal() {
    // Cierra el modal
    this.modalAbierto = false;
    
  }

  editarEvento(eventoId: number): void {
    const evento = this.eventos.find(e => e.id === eventoId);
    const dialogRef = this.dialog.open(EditarEventoComponent, {
      width: '900px',
      data: evento // Pasa el evento como dato al modal de edición
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de edición de evento se cerró');
      this.cargarEventos(); // Recarga los eventos después de cerrar el modal de edición
    });
  }

  eliminarEvento(eventoId: number): void {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este evento?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar evento'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventoService.eliminarEvento(eventoId).subscribe(
          () => {
            Swal.fire(
              'Evento eliminado',
              'El evento ha sido eliminado correctamente',
              'success'
            );
            // Recargar los eventos después de eliminar
            this.cargarEventos();
          },
          (error) => {
            console.error('Error al eliminar el evento:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar el evento. Por favor, inténtalo de nuevo más tarde.',
              'error'
            );
          }
        );
      }
    });
  }
}