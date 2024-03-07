import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { AgregarQuejaComponent } from 'src/app/modal-pages/agregar-queja/agregar-queja.component';
import { ReportarQuejaComponent } from 'src/app/modal-pages/reportar-queja/reportar-queja.component';
import { Queja } from 'src/app/service/model/Queja';
import { QuejaService } from 'src/app/service/queja/queja.service';
import { ReportarQuejaService } from 'src/app/service/reportarQueja/reportar-queja.service';

@Component({
  selector: 'app-quejas',
  templateUrl: './quejas.component.html',
  styleUrls: ['./quejas.component.css'],
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
export class QuejasComponent {
  quejas: Queja[] = [];
  quejasPaginadas: Queja[] = [];
  currentPageIndex: number = 0;
  loggedInUserId: number | null = null;
  quejaSeleccionadaId: number | null = null;

  constructor(private quejaService: QuejaService,
    private reportarQuejaService : ReportarQuejaService,
    public dialog: MatDialog,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.cargarQuejas();
    this.verificarQuejasReportadas();
  }
  abrirModalAgregarQueja(): void {
    const dialogRef = this.dialog.open(AgregarQuejaComponent, {
      width: '900px' // Ajusta el ancho del modal según sea necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de agregar queja se cerró');
      this.cargarQuejas();
    });
  }

  formatReportes(reportes: any[]): string {
    return reportes.map(reporte => reporte.usuario.nombre).join(', ');
  }

  verificarQuejasReportadas(): void {
    this.quejas.forEach(queja => {
      this.reportarQuejaService.obtenerReporteQuejaPorIdQueja(queja.id).subscribe(
        (reportes: any[]) => {
          queja.reportes = reportes;
        },
        (error) => {
          console.error('Error al verificar el reporte de la queja:', error);
        }
      );
    });
  }
  
  usuarioReportadoQueja(queja: Queja): boolean {
    if (!queja.reportes || queja.reportes.length === 0) {
      return false; // Si no hay reportes, el usuario no ha reportado esta queja
    }
    // Verificar si el usuario actual ha reportado esta queja
    return queja.reportes.some(reporte => reporte.usuario.id === this.loggedInUserId);
  }

  abrirModalReportarQueja(quejaId: number): void {
    console.log('ID de la queja seleccionada:', quejaId); 
    const dialogRef = this.dialog.open(ReportarQuejaComponent, {
      width: '400px', // Ancho del modal
      data: { quejaId : quejaId} // Puedes pasar datos adicionales al modal si es necesario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de reportar queja se cerró');
      this.cargarQuejas();
      // Aquí puedes realizar acciones adicionales después de que se cierre el modal
    });
  }
  
  cargarQuejas(): void {
    this.quejaService.obtenerQuejas().subscribe(
      (data: Queja[]) => {
        this.quejas = data;
        this.actualizarQuejasPaginadas();
        this.verificarQuejasReportadas()
      },
      (error) => {
        console.error('Error al obtener quejas:', error);
      }
    );
  }

  actualizarQuejasPaginadas(): void {
    const startIndex = this.currentPageIndex * 6;
    const endIndex = Math.min(startIndex + 6, this.quejas.length);
    this.quejasPaginadas = this.quejas.slice(startIndex, endIndex);
  }

  onPaginateChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.actualizarQuejasPaginadas();
  }
  
  abrirGoogleMaps(ubicacion: string): void {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}`;
    window.open(googleMapsUrl, '_blank');

  }
}
