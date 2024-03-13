import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { QuejaService } from 'src/app/service/queja/queja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-queja',
  templateUrl: './editar-queja.component.html',
  styleUrls: ['./editar-queja.component.css']
})
export class EditarQuejaComponent implements OnInit{
  registroError: string = "";
  edicionForm: FormGroup;
  archivoBase64: string | null = null;
  loggedInUserId: number | null = null;
  estados: string[] = ['por aprobar', 'pendiente', 'resuelto'];
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private quejaService: QuejaService,
    public dialogRef: MatDialogRef<EditarQuejaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.edicionForm = this.formBuilder.group({
      titulo: [data.titulo, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      ubicacion: [data.ubicacion, Validators.required],
      estado:[data.estado, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loggedInUserId = this.authService.getLoggedInUserId();
  }

displayEstado(estado: string): string {
    return estado ? estado : '';
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
    
  editarQueja(): void {
    if (this.edicionForm.valid && this.archivoBase64) {
      const quejaData = new FormData();
      quejaData.append('titulo', this.edicionForm.get('titulo')?.value);
      quejaData.append('descripcion', this.edicionForm.get('descripcion')?.value);
      quejaData.append('ubicacion', this.edicionForm.get('ubicacion')?.value);
      quejaData.append('img', this.archivoBase64);
      quejaData.append('usuarioId', String(this.loggedInUserId));
      quejaData.append('estado', this.edicionForm.get('estado')?.value);
      quejaData.append('fechaReporte', new Date().toISOString())


      const quejaId = this.data.id;
      this.quejaService.editarQueja(quejaId, quejaData).subscribe({
        next: (userData) => {
          console.log(userData);
          Swal.fire({
            icon: 'success',
            title: '¡Queja editada exitosamente!',
            text: 'La queja ha sido editado correctamente.',
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
            text: 'Hubo un error al editar la queja. Por favor, inténtalo de nuevo más tarde.',
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
    this.dialogRef.close();
  }
}
