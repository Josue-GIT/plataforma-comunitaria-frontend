import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { QuejaRequest } from 'src/app/service/queja/QuejaRequest';
import { QuejaService } from 'src/app/service/queja/queja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-queja',
  templateUrl: './agregar-queja.component.html',
  styleUrls: ['./agregar-queja.component.css']
})
export class AgregarQuejaComponent implements OnInit{
  registroError: string = "";
  registroForm: FormGroup;
  archivoBase64: string | null = null;
  loggedInUserId: number | null = null;
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private quejaService: QuejaService,
    public dialogRef: MatDialogRef<AgregarQuejaComponent>) { 
    this.registroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      estado:['por aprobar', Validators.required]
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
    
  registrarQueja(): void {
    if (this.registroForm.valid && this.archivoBase64) {
      const quejaData = new FormData();
      quejaData.append('titulo', this.registroForm.get('titulo')?.value);
      quejaData.append('descripcion', this.registroForm.get('descripcion')?.value);
      quejaData.append('ubicacion', this.registroForm.get('ubicacion')?.value);
      quejaData.append('img', this.archivoBase64);
      quejaData.append('usuarioId', String(this.loggedInUserId));
      quejaData.append('estado', this.registroForm.get('estado')?.value);
      quejaData.append('fechaReporte', new Date().toISOString())
      this.quejaService.registrarQueja(quejaData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Queja registrada exitosamente!',
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
            title: 'Error al registrar la queja',
            text: 'Hubo un problema al registrar la queja. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al registrar la queja:', error);
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
