import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { AgregarProyectoComponent } from 'src/app/modal-pages/parte-proyecto/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from 'src/app/modal-pages/parte-proyecto/editar-proyecto/editar-proyecto.component';
import { Proyecto } from 'src/app/service/model/Proyecto';
import { ProyectoService } from 'src/app/service/proyecto/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
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
export class ProyectosComponent {
  proyectos: Proyecto[] = [];
  loggedInUserId: number | null = null;
  userRole: string | null = null;
  modalAbierto: boolean = false;

  constructor(private proyectoService: ProyectoService,
              private authService : AuthService,
              private sanitizer: DomSanitizer,
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }

  dataToImage(dataURI: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/*;base64,' + dataURI);
  }

  cargarProyectos(): void {
    this.proyectoService.obtenerProyectos().subscribe(
      (data: Proyecto[]) => {
        this.proyectos = data;
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

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  registrarProyecto() {
    const dialogRef = this.dialog.open(AgregarProyectoComponent, {
      width: '900px', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de proyectos se cerró');
      this.cargarProyectos();
    });
  }

  editarProyecto(proyectoId: number): void {
    const proyecto = this.proyectos.find(e => e.id === proyectoId);
    const dialogRef = this.dialog.open(EditarProyectoComponent, {
      width: '900px',
      data: proyecto // Pasa el proyecto como dato al modal de edición
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de edición de proyecto se cerró');
      this.cargarProyectos(); 
    });
  }

  
  cerrarModal() {
    this.modalAbierto = false;
    
  }
}
