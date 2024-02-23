import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reportar-queja',
  templateUrl: './reportar-queja.component.html',
  styleUrls: ['./reportar-queja.component.css']
})
export class ReportarQuejaComponent {
  razonSeleccionada: string = '';

  constructor(public dialogRef: MatDialogRef<ReportarQuejaComponent>) { }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  reportarQueja(): void {
    // Aquí puedes enviar la queja reportada al servidor o realizar alguna otra acción
    console.log('Razón seleccionada:', this.razonSeleccionada);
    this.cerrarModal(); // Cierra el modal después de procesar el reporte
  }
}
