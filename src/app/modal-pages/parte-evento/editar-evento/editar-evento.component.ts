import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoRequest } from 'src/app/service/evento/EventoRequest';
import { EventoService } from 'src/app/service/evento/evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {

  registroError: string = "";
  edicionForm = this.formBuilder.group({
    titulo: ['', Validators.required],
    url: ['', [Validators.required]],
    descripcion: ['', Validators.required],
    fechaHora: ['', Validators.required],
    ubicacion: ['', Validators.required],
  });

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
  });}

  ngOnInit(): void {
    // Cargar la información del evento a editar en el formulario
    this.edicionForm.patchValue({
      titulo: this.data.evento.titulo,
      url: this.data.evento.url,
      descripcion: this.data.evento.descripcion,
      fechaHora: this.data.evento.fechaHora,
      ubicacion: this.data.evento.ubicacion
    });
  }

  editarEvento(): void {
    if (this.edicionForm.valid) {
      const eventoId = this.data.id;
      const eventoActualizado = this.edicionForm.value as EventoRequest;
      this.eventoService.editarEvento(eventoId, eventoActualizado).subscribe({
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
