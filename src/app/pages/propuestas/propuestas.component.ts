  import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
  import { MatIconRegistry } from '@angular/material/icon';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
  import { AuthService } from 'src/app/auth/auth.service';
import { AgregarPropuestaComponent } from 'src/app/modal-pages/parte-propuesta/agregar-propuesta/agregar-propuesta.component';
import { EditarPropuestaComponent } from 'src/app/modal-pages/parte-propuesta/editar-propuesta/editar-propuesta.component';
  import { Propuesta } from 'src/app/service/model/Propuesta';
  import { PropuestaService } from 'src/app/service/propuesta/propuesta.service';
  import { VotosPropuestaService } from 'src/app/service/propuesta/votos-propuesta.service';
import Swal from 'sweetalert2';

  @Component({
    selector: 'app-propuestas',
    templateUrl: './propuestas.component.html',
    styleUrls: ['./propuestas.component.css']
  })
  export class PropuestasComponent implements OnInit {
    propuestas: Propuesta[] = [];
    loggedInUserId: number | null = null;
    typeof: any;
    userRole: string | null = null;
    modalAbierto: boolean = false;

    constructor(
      private propuestaService: PropuestaService,
      private votosPropuestaService: VotosPropuestaService,
      private authService: AuthService,
      private dialog: MatDialog,
      iconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer
    ) {

      iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-up.svg'));
      iconRegistry.addSvgIcon('thumbs-down', sanitizer.bypassSecurityTrustResourceUrl('assets/thumbs-down.svg'));
    }
    
    ngOnInit() {
      this.cargarPropuestas();
      this.loggedInUserId = this.authService.getLoggedInUserId();
      this.authService.getUserRole().subscribe(role => {
        this.userRole = role;
      });
    }
    votarPositivo(idPropuesta: number) {
      this.votosPropuestaService.votarPropuestaPositivo(idPropuesta, this.loggedInUserId ?? 0).subscribe(
        () => {
          this.cargarPropuestas();
        },
        (error) => {
          console.error(`Error al votar positivamente para la propuesta ${idPropuesta}`, error);
        }
      );
    }

    dataToImage(dataURI: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
    }

    isAdmin(): Observable<boolean> {
      return this.authService.getUserRole().pipe(
        map(rol => rol === 'ADMIN')
      );
    }
    cancelarVotoPositivo(idPropuesta: number) {
      this.votosPropuestaService.cancelarVotoPositivo(idPropuesta, this.loggedInUserId ?? 0).subscribe(
        (response) => {
          if (response && response.message) {
            console.log(response.message); // Imprime el mensaje del servidor
          }
          this.cargarPropuestas();
          
        },
        (error) => {
          console.error(`Error al cancelar el voto positivo para la propuesta ${idPropuesta}`, error);
        }
      );
    }
    
    manejarClicVotar(event: Event, propuesta: Propuesta) {
      event.stopPropagation();  

      if (propuesta.votos && typeof propuesta.votos === 'object') {
        this.cancelarVotoPositivo(propuesta.id);
      } else {
        this.votarPositivo(propuesta.id);
      }
    }

    cargarPropuestas() {
      this.propuestaService.obtenerPropuestas().subscribe((propuestas) => {
        this.propuestas = propuestas;

        this.propuestas.forEach((propuesta) => {
          this.votosPropuestaService.obtenerVotosPositivosPorPropuesta(propuesta.id).subscribe(
            (cantidadVotosPositivos) => {
              propuesta.votos = cantidadVotosPositivos;  
            },
            (error) => {
              console.error(`Error al obtener la cantidad de votos positivos para la propuesta ${propuesta.id} (posiblemente sus votos sean 0)`);
            }
          );
        });
      });
    }
    esObjeto(obj: any): obj is { cantidadVotosPositivos: number } {
      return typeof obj === 'object' && obj !== null && 'cantidadVotosPositivos' in obj;
    }
    
    registrarPropuesta() {
      const dialogRef = this.dialog.open(AgregarPropuestaComponent, {
        width: '900px', 
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('El modal de propuestas se cerró');
        this.cargarPropuestas();
      });
    }
    cerrarModal() {
      this.modalAbierto = false;
      
    }

    editarPropuesta(propuestaId: number): void {
      const propuesta = this.propuestas.find(e => e.id === propuestaId);
      const dialogRef = this.dialog.open(EditarPropuestaComponent, {
        width: '900px',
        data: propuesta
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('El modal de edición de propuesta se cerró');
        this.cargarPropuestas(); // Recarga los eventos después de cerrar el modal de edición
      });
    }

    eliminarPropuesta(propuestaId: number): void {
      Swal.fire({
        title: '¿Seguro que quieres eliminar esta propuesta?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar propuesta'
      }).then((result) => {
        if (result.isConfirmed) {
          this.propuestaService.eliminarPropuesta(propuestaId).subscribe(
            () => {
              Swal.fire(
                'Propuesta eliminadagig',
                'La propuesta ha sido eliminado correctamente',
                'success'
              );
              // Recargar los eventos después de eliminar
              this.cargarPropuestas();
            },
            (error) => {
              console.error('Error al eliminar la propuesta:', error);
              Swal.fire(
                'Error',
                'Hubo un error al eliminar la propuesta. Por favor, inténtalo de nuevo más tarde.',
                'error'
              );
            }
          );
        }
      });
    }
  }
