import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReporteQueja } from 'src/app/service/model/Queja';
import { QuejaService } from 'src/app/service/queja/queja.service';
import { ReportarQuejaService } from 'src/app/service/reportarQueja/reportar-queja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes-queja',
  templateUrl: './reportes-queja.component.html',
  styleUrls: ['./reportes-queja.component.css']
})
export class ReportesQuejaComponent implements OnInit {
  loggedInUserId: number | null = null;
  reportesQueja: ReporteQueja[] = [];

  constructor(private authService: AuthService,
    private reportesQuejaService: ReportarQuejaService,
    private quejaService: QuejaService) { }

  ngOnInit() {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.cargarReportesQueja();
  }

  cargarReportesQueja(): void {
    if (this.loggedInUserId) {
      this.reportesQuejaService.obtenerReportesQueja().subscribe(
        (data: any[]) => {
          console.log('Datos de reportes Queja:', data); // Agrega esta línea para verificar los datos recibidos
         
          this.reportesQueja = data;
        },
        (error) => {
          console.error('Error al cargar los reportes de las queja:', error);
        }
      );
    }
  }

  eliminarQueja(quejaId: number): void {
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
        this.quejaService.eliminarQueja(quejaId).subscribe(
          () => {
            Swal.fire(
              'Queja eliminada',
              'La queja reportada ha sido eliminada correctamente',
              'success'
            );
            this.cargarReportesQueja();
          },
          (error) => {
            console.error('Error al eliminar la queja:', error);
            Swal.fire(
              'Error',
              'Hubo un error al eliminar la queja. Por favor, inténtalo de nuevo más tarde.',
              'error'
            );
          }
        );
      }
    });
  }

  vetarUsuario(id: number): void {
    this.reportesQuejaService.vetarUsuario(id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario vetado',
          text: 'El usuario ha sido vetado exitosamente',
        }).then(() => {
          this.cargarReportesQueja();
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al vetar el usuario. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    );
  }
  
  quitarVetoUsuario(id: number): void {
    this.reportesQuejaService.quitarVetoUsuario(id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Veto removido',
          text: 'El veto ha sido removido exitosamente',
        }).then(() => {
          this.cargarReportesQueja();
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al quitar el veto al usuario. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    );
  }
}
