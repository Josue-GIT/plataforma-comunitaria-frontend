import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReporteQueja } from 'src/app/service/model/Queja';
import { ReportarQuejaService } from 'src/app/service/reportarQueja/reportar-queja.service';

@Component({
  selector: 'app-reportes-queja',
  templateUrl: './reportes-queja.component.html',
  styleUrls: ['./reportes-queja.component.css']
})
export class ReportesQuejaComponent implements OnInit {
  loggedInUserId: number | null = null;
  reportesQueja: ReporteQueja[] = [];

  constructor(private authService: AuthService,
    private reportesQuejaService: ReportarQuejaService) { }

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
}
