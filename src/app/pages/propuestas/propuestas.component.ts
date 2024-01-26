  import { Component, OnInit } from '@angular/core';
  import { MatIconRegistry } from '@angular/material/icon';
  import { DomSanitizer } from '@angular/platform-browser';
  import { AuthService } from 'src/app/auth/auth.service';
  import { Propuesta } from 'src/app/service/model/Propuesta';
  import { PropuestaService } from 'src/app/service/propuesta/propuesta.service';
  import { VotosPropuestaService } from 'src/app/service/propuesta/votos-propuesta.service';
  import { concatMap, finalize } from 'rxjs/operators';
  
  @Component({
    selector: 'app-propuestas',
    templateUrl: './propuestas.component.html',
    styleUrls: ['./propuestas.component.css']
  })
  export class PropuestasComponent implements OnInit {
    propuestas: Propuesta[] = [];
    loggedInUserId: number | null = null;
    
    constructor(
      private propuestaService: PropuestaService,
      private votosPropuestaService: VotosPropuestaService,
      private authService: AuthService,
      iconRegistry: MatIconRegistry,
      sanitizer: DomSanitizer
    ) {
      // Registro de iconos en el constructor
      iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-up.svg'));
      iconRegistry.addSvgIcon('thumbs-down', sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-down.svg'));
    }
    
    ngOnInit() {
      this.cargarPropuestas();
      this.loggedInUserId = this.authService.getLoggedInUserId();
    }

    manejarClicVotar(event: Event, propuesta: Propuesta) {
      event.stopPropagation();  // Evita la propagación del evento al acordeón
    }

    cargarPropuestas() {
      this.propuestaService.obtenerPropuestas().subscribe((propuestas) => {
        this.propuestas = propuestas;
    
        // Ahora, para cada propuesta, obtenemos los votos positivos utilizando el servicio de votosPropuesta
        this.propuestas.forEach((propuesta) => {
          this.votosPropuestaService.obtenerVotosPositivosPorPropuesta(propuesta.id).subscribe(
            (cantidadVotosPositivos) => {
              propuesta.votos = cantidadVotosPositivos;  // Actualiza la propiedad 'votos' de la propuesta
            },
            (error) => {
              console.error(`Error al obtener la cantidad de votos positivos para la propuesta ${propuesta.id}`, error);
            }
          );
        });
      });
    }
    esObjeto(obj: any): obj is { cantidadVotosPositivos: number } {
      return typeof obj === 'object' && obj !== null && 'cantidadVotosPositivos' in obj;
    }
    
  }
