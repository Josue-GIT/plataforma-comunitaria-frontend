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
  quejaForm: FormGroup;
  registroError: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private quejaService: QuejaService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AgregarQuejaComponent>
  ) {
    this.quejaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      url: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      usuarioId: [null] // Aquí almacenaremos el ID del usuario que presenta la queja
    });
  }

  ngOnInit(): void {
    // Obtenemos el ID del usuario actualmente autenticado
    const loggedInUserId = this.authService.getLoggedInUserId();
    if (loggedInUserId) {
      // Si se encuentra un ID de usuario válido, lo establecemos en el formulario
      this.quejaForm.patchValue({ usuarioId: loggedInUserId });
    }
  }

  agregarQueja(): void {
    if (this.quejaForm.valid) {
      const quejaData = this.quejaForm.value;
      quejaData.estado = 'por aprobar';
  
      const loggedInUserId = this.authService.getLoggedInUserId();
      if (loggedInUserId) {
        quejaData.usuario = { id: loggedInUserId }; // Agregar el ID del usuario a los datos de la queja
      }
  
      // Agregar la fecha de reporte actual
      quejaData.fechaReporte = new Date().toISOString();
  
      this.quejaService.agregarQueja(quejaData).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: '¡Queja agregada correctamente!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.dialogRef.close(true);
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar la queja',
            text: 'Hubo un problema al procesar la queja. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al agregar la queja:', error);
        }
      );
    } else {
      this.quejaForm.markAllAsTouched();
      // Manejo de errores si el formulario no es válido
    }
  }

  cerrarModal(): void {
    this.dialogRef.close(false);
  }
}
