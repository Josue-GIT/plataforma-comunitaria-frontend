import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Queja } from 'src/app/service/model/Queja';
import { QuejaService } from 'src/app/service/queja/queja.service';

@Component({
  selector: 'app-quejas',
  templateUrl: './quejas.component.html',
  styleUrls: ['./quejas.component.css']
})
export class QuejasComponent {
  quejas: Queja[] = [];

  constructor(private quejaService: QuejaService) { }

  ngOnInit(): void {
    this.cargarQuejas();
  }

  cargarQuejas(): void {
    this.quejaService.obtenerQuejas().subscribe(
      (data: Queja[]) => {
        this.quejas = data;
      },
      (error) => {
        console.error('Error al obtener quejas:', error);
      }
    );
  }

  abrirGoogleMaps(ubicacion: string): void {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(ubicacion)}`;
    window.open(googleMapsUrl, '_blank');

  }
}
