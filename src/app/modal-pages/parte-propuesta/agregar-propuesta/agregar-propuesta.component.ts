import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PropuestaService } from 'src/app/service/propuesta/propuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-propuesta',
  templateUrl: './agregar-propuesta.component.html',
  styleUrls: ['./agregar-propuesta.component.css']
})
export class AgregarPropuestaComponent {
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;
  loggedInUserId: number | null = null;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private propuestaService: PropuestaService,
    public dialogRef: MatDialogRef<AgregarPropuestaComponent>) { 
    this.registroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
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
    
  registrarPropuesta(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const propuestaData = new FormData();
      propuestaData.append('titulo', this.registroForm.get('titulo')?.value);
      propuestaData.append('descripcion', this.registroForm.get('descripcion')?.value);
      propuestaData.append('ubicacion', this.registroForm.get('ubicacion')?.value);
      propuestaData.append('img', this.archivoBase64);
      propuestaData.append('usuarioId', String(this.loggedInUserId));
  
      this.propuestaService.registrarPropuesta(propuestaData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Propuesta registrada exitosamente!',
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
            title: 'Error al registrar la propuesta',
            text: 'Hubo un problema al registrar la propuesta. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al registrar la propuesta:', error);
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
