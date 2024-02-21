import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EventoModalComponent } from 'src/app/modal-pages/evento-modal/evento-modal.component';
EventoModalComponent
import { Usuario } from 'src/app/service/model/Usuario';
import { PerfilService } from 'src/app/service/perfil/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  loggedInUserId: number | null = null;
  user: Usuario | null = null;
  modalAbierto: boolean = false;

  constructor(private authService: AuthService,
              private perfilService: PerfilService,
              private dialog: MatDialog) { }
  
  ngOnInit() {
    this.loggedInUserId = this.authService.getLoggedInUserId();
    if (this.loggedInUserId) {
      this.perfilService.obtenerPerfil(this.loggedInUserId).subscribe(
        (usuario: Usuario) => {
          console.log('Perfil del usuario en sesión:', usuario);
          this.user = usuario;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario en sesión:', error);
        }
      );
    }
    
  }
  verEventosUsuario() {
    const dialogRef = this.dialog.open(EventoModalComponent, {
      width: '450px', // ajusta el ancho del modal según sea necesario
      // puedes agregar más opciones de configuración aquí
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de eventos se cerró');
    });
  }
  cerrarModal() {
    // Cierra el modal
    this.modalAbierto = false;
  }
  
}
