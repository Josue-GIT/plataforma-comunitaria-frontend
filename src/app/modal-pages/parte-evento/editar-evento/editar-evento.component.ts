import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from 'src/app/service/evento/evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {

  registroError: string = "";
  edicionForm: FormGroup;
  archivoBase64: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private eventoService: EventoService,
    public dialogRef: MatDialogRef<EditarEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.edicionForm = this.formBuilder.group({
      titulo: [data.titulo, Validators.required],
      url: [data.url, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      fechaHora: [data.fechaHora, Validators.required],
      ubicacion: [data.ubicacion, Validators.required],
    });
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
  ngOnInit(): void {
  }

  editarEvento(): void {
    if (this.edicionForm.valid) {
      const eventoData = new FormData();
      eventoData.append('titulo', this.edicionForm.get('titulo')?.value);
      eventoData.append('descripcion', this.edicionForm.get('descripcion')?.value);
      eventoData.append('fechaHora', this.edicionForm.get('fechaHora')?.value);
      eventoData.append('ubicacion', this.edicionForm.get('ubicacion')?.value);
      if (this.archivoBase64) {
        eventoData.append('img', this.archivoBase64);
      }

      const eventoId = this.data.id;
      this.eventoService.editarEvento(eventoId, eventoData).subscribe({
        next: (userData) => {
          console.log(userData);
          Swal.fire({
            icon: 'success',
            title: '¡Evento editado exitosamente!',
            text: 'El evento ha sido editado correctamente.',
            confirmButtonText: 'Aceptar'
          });
          this.dialogRef.close(true); // Cerrar el modal con éxito
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroError = errorData;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al editar el evento. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
          });
        },
        complete: () => {
          console.info("Edición completa");
        }
      });
    } else {
      this.edicionForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos del formulario.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  cerrarModal(): void {
    this.dialogRef.close(false); // Cerrar el modal sin éxito
  }
}