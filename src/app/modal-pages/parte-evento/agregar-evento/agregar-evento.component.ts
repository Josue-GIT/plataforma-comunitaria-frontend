import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from 'src/app/service/evento/evento.service';
import Swal from 'sweetalert2';
import { EventoRequest } from 'src/app/service/evento/EventoRequest';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.css']
})
export class AgregarEventoComponent implements OnInit {
  
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private eventoService: EventoService,
    public dialogRef: MatDialogRef<AgregarEventoComponent>) { 
    this.registroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: string = reader.result as string;
        this.archivoBase64 = base64String.split(',')[1]; // Eliminar la parte inicial "data:image/png;base64,"
        console.log(this.archivoBase64); // Imprime el base64 de la imagen sin el prefijo
      };
      reader.readAsDataURL(file);
    }
  }
    
  registrarEvento(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const eventoData = new FormData();
      eventoData.append('titulo', this.registroForm.get('titulo')?.value);
      eventoData.append('descripcion', this.registroForm.get('descripcion')?.value);
      eventoData.append('fechaHora', this.registroForm.get('fechaHora')?.value);
      eventoData.append('ubicacion', this.registroForm.get('ubicacion')?.value);
      eventoData.append('img', this.archivoBase64);
  
      this.eventoService.registrarEvento(eventoData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Evento registrado exitosamente!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.dialogRef.close(true);
            this.cerrarModal();
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el evento',
            text: 'Hubo un problema al registrar el evento. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al registrar el evento:', error);
        }
      );
    } else {
      this.registroForm.markAllAsTouched();
      // Manejo de errores si el formulario no es válido o la imagen no está seleccionada
    }
  }
  cerrarModal(): void {
    this.dialogRef.close();
  }
  
}
