import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PropuestaService } from 'src/app/service/propuesta/propuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-propuesta',
  templateUrl: './editar-propuesta.component.html',
  styleUrls: ['./editar-propuesta.component.css']
})
export class EditarPropuestaComponent implements OnInit{

  registroError: string = "";
  edicionForm: FormGroup;
  archivoBase64: string | null = null;
  loggedInUserId: number | null = null;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private propuestaService: PropuestaService,
    public dialogRef: MatDialogRef<EditarPropuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.edicionForm = this.formBuilder.group({
      titulo: [data.titulo, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      ubicacion: [data.ubicacion, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: string = reader.result as string;
        this.archivoBase64 = base64String.split(',')[1];
        console.log(this.archivoBase64);
      };
      reader.readAsDataURL(file);
    }
  }

  editarPropuesta(): void {
    if (this.edicionForm.valid) {
      const propuestaData = new FormData();
      propuestaData.append('titulo', this.edicionForm.get('titulo')?.value);
      propuestaData.append('descripcion', this.edicionForm.get('descripcion')?.value);
      propuestaData.append('fechaHora', this.edicionForm.get('fechaHora')?.value);
      propuestaData.append('ubicacion', this.edicionForm.get('ubicacion')?.value);
      propuestaData.append('usuarioId', String(this.loggedInUserId));
      if (this.archivoBase64) {
        propuestaData.append('img', this.archivoBase64);
      }

      const propuestaId = this.data.id;
      this.propuestaService.editarPropuesta(propuestaId, propuestaData).subscribe({
        next: (userData) => {
          console.log(userData);
          Swal.fire({
            icon: 'success',
            title: '¡Propuesta editada exitosamente!',
            text: 'La propuesta ha sido editado correctamente.',
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
            text: 'Hubo un error al editar la propuesta. Por favor, inténtalo de nuevo más tarde.',
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
    this.dialogRef.close(false); 
  }
}
