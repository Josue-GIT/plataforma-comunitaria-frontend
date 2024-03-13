import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProyectoService } from 'src/app/service/proyecto/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {
  
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    public dialogRef: MatDialogRef<AgregarProyectoComponent>) { 
    this.registroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      estado: ['En Planificación']
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
        this.archivoBase64 = base64String.split(',')[1];
        console.log(this.archivoBase64);
      };
      reader.readAsDataURL(file);
    }
  }

  registrarProyecto(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const proyectoData = new FormData();
      proyectoData.append('titulo', this.registroForm.get('titulo')?.value);
      proyectoData.append('descripcion', this.registroForm.get('descripcion')?.value);
      proyectoData.append('ubicacion', this.registroForm.get('ubicacion')?.value);
      proyectoData.append('estado', this.registroForm.get('estado')?.value);
      proyectoData.append('img', this.archivoBase64);
  
      this.proyectoService.registrarProyecto(proyectoData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Proyecto registrado exitosamente!',
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
            title: 'Error al registrar el proyecto',
            text: 'Hubo un problema al registrar el proyecto. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al registrar el proyecto:', error);
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
