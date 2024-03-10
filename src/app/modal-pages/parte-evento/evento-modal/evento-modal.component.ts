import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { Evento, ParticipacionEvento } from 'src/app/service/model/Evento';
import { ParticipacionEventoService } from 'src/app/service/participacionEvento/participacion-evento.service';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-evento-modal',
  templateUrl: './evento-modal.component.html',
  styleUrls: ['./evento-modal.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
  
})
export class EventoModalComponent implements OnInit{

  loggedInUserId: number | null = null;
  eventosUsuario: ParticipacionEvento[] = [];
  constructor(private authService: AuthService,
    private participacionEventoService: ParticipacionEventoService,
    private sanitizer:DomSanitizer,
    public dialogRef: MatDialogRef<EventoModalComponent>) { }
  
  

  ngOnInit() {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    // Aquí obtienes los eventos del usuario al inicializar el componente del modal
    // Supongamos que loggedInUserId contiene el ID del usuario en sesión
    this.cargarEventosUsuario();
  }

  dataToImage(dataURI: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
  }
  
  cargarEventosUsuario(): void {
    if (this.loggedInUserId) {
      this.participacionEventoService.obtenerEventosUsuario(this.loggedInUserId).subscribe(
        (data: any[]) => {
          console.log('Datos de eventos del usuario:', data); // Agrega esta línea para verificar los datos recibidos
          this.eventosUsuario = data;
        },
        (error) => {
          console.error('Error al cargar los eventos del usuario:', error);
        }
      );
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  abrirGoogleMaps(ubicacion: string): void {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}`;
    window.open(googleMapsUrl, '_blank');

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
            this.cargarEventosUsuario(); // Recargar los eventos después de cancelar la participación
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
}
