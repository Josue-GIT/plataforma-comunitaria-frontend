import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento/evento.service';
import Swal from 'sweetalert2';
import { RegistroService } from 'src/app/service/registro/registro.service';
import { EventoRequest } from 'src/app/service/evento/EventoRequest';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.css']
})
export class AgregarEventoComponent {

  registroError: string = "";
  registroForm = this.formBuilder.group({
    titulo: ['', Validators.required],
    url: ['', [Validators.required]],
    descripcion: ['', Validators.required],
    fechaHora: ['', Validators.required],
    ubicacion: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private registroService: RegistroService,
    private eventoService: EventoService,
    public dialogRef: MatDialogRef<AgregarEventoComponent>) { } 

    get titulo() {
      return this.registroForm.get('titulo');
    }
  
    get url() {
      return this.registroForm.get('url');
    }
  
    get descripcion() {
      return this.registroForm.get('descripcion');
    }
  
    get fechaHora() {
      return this.registroForm.get('fechaHora');
    }
  
    get ubicacion() {
      return this.registroForm.get('ubicacion');
    }

    registrarEvento(): void {
      if (this.registroForm.valid) {
        this.eventoService.registrarEvento(this.registroForm.value as EventoRequest).subscribe({
          next: (userData) => {
            console.log(userData);
            Swal.fire({
              icon: 'success',
              title: '¡Evento registrado exitosamente!',
              text: 'El nuevo evento ha sido registrado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/eventos']);
              }
            });
          },
          error: (errorData) => {
            console.error(errorData);
            this.registroError = errorData;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al registrar el evento. Por favor, inténtalo de nuevo más tarde.',
              confirmButtonText: 'Aceptar'
            });
          },
          complete: () => {
            console.info("Registro completo");
          }
        });
      } else {
        this.registroForm.markAllAsTouched();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa todos los campos del formulario.',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    
    cerrarModal(): void {
      this.dialogRef.close();
    }
    
}
