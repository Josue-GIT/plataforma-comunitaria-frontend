import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { ReportarQuejaService } from 'src/app/service/reportarQueja/reportar-queja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportar-queja',
  templateUrl: './reportar-queja.component.html',
  styleUrls: ['./reportar-queja.component.css']
})
export class ReportarQuejaComponent {
  razonSeleccionada: string = '';
  reporteEnviado: boolean = false;
  quejaId: number | null = null;

  constructor(public dialogRef: MatDialogRef<ReportarQuejaComponent>,
    private authService: AuthService,
    private reportarQuejaService: ReportarQuejaService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.quejaId = data.quejaId; 
    }

  cerrarModal(): void {
    
    this.dialogRef.close();
  }

  reportarQueja(): void {
    const loggedInUserId = this.authService.getLoggedInUserId();
    const fechaReporte = new Date().toLocaleDateString('es-ES'); // Obtiene la fecha actual en formato dd-MM-yyyy

    const reporteQueja = {
      usuario: { id: loggedInUserId },
      quejaProblema: { id: this.quejaId },
      fechaReporte: fechaReporte,
      mensaje: this.razonSeleccionada
    };
    this.reportarQuejaService.crearReporteQueja(reporteQueja).subscribe(
      (response) => {
        console.log('Reporte de queja enviado correctamente:', response);
        this.reporteEnviado = true; 
        // Marcar el reporte como enviado
        this.mostrarAlertaExito(); // Mostrar el SweetAlert2 de éxito
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al enviar el reporte de queja:', error);
        this.mostrarAlertaError();
      }
    );
  }

  mostrarAlertaExito(): void {
    Swal.fire({
      icon: 'success',
      title: 'Reporte enviado correctamente',
      text: '¡Gracias por tu colaboración!',
    });
  }

  mostrarAlertaError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error al reportar queja',
      text: 'Ha ocurrido un problema al enviar el reporte. Por favor, inténtalo de nuevo más tarde.',
    });
  }
}
