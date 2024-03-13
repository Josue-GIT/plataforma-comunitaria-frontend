import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectoService } from 'src/app/service/proyecto/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {

  registroError: string = "";
  edicionForm: FormGroup;
  archivoBase64: string | null = null;
  estados: string[] = ['En planificación', 'En progreso', 'Culminado'];
  
  constructor(
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<EditarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.edicionForm = this.formBuilder.group({
      titulo: [data.titulo, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      ubicacion: [data.ubicacion, Validators.required],
      estado: [data.estado, Validators.required] 
    });
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

  ngOnInit(): void {
  }

  editarProyecto(): void {
    if (this.edicionForm.valid) {
      const proyectoData = new FormData();
      proyectoData.append('titulo', this.edicionForm.get('titulo')?.value);
      proyectoData.append('descripcion', this.edicionForm.get('descripcion')?.value);
      proyectoData.append('ubicacion', this.edicionForm.get('ubicacion')?.value);
      proyectoData.append('estado', this.edicionForm.get('estado')?.value);
      if (this.archivoBase64) {
        proyectoData.append('img', this.archivoBase64);
      }

      const proyectoId = this.data.id;
      this.proyectoService.editarProyecto(proyectoId, proyectoData).subscribe({
        next: (userData) => {
          console.log(userData);
          Swal.fire({
            icon: 'success',
            title: '¡Proyecto editado exitosamente!',
            text: 'El proyecto ha sido editado correctamente.',
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
            text: 'Hubo un error al editar el proyecto. Por favor, inténtalo de nuevo más tarde.',
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
