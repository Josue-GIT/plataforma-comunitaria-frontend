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

  constructor(private quejaService: QuejaService,
    public dialog: MatDialog,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.cargarQuejas();
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
  
  abrirModalReportarQueja(): void {
    const dialogRef = this.dialog.open(ReportarQuejaComponent, {
      width: '400px', // Ancho del modal
      data: {} // Puedes pasar datos adicionales al modal si es necesario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de reportar queja se cerró');
      // Aquí puedes realizar acciones adicionales después de que se cierre el modal
    });
  }
  
  cargarQuejas(): void {
    this.quejaService.obtenerQuejas().subscribe(
      (data: Queja[]) => {
        this.quejas = data;
        this.actualizarQuejasPaginadas();
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
