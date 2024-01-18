import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/service/registro/registro.service';
import { RegistroRequest } from 'src/app/service/registro/RegistroRequest';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroError: string = "";
  registroForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private registroService: RegistroService) { }

  get username() {
    return this.registroForm.controls.username;
  }

  get email() {
    return this.registroForm.controls.email;
  }

  get password() {
    return this.registroForm.controls.password;
  }

  get nombre() {
    return this.registroForm.controls.nombre;
  }

  get apellido() {
    return this.registroForm.controls.apellido;
  }

  registrar() {
    if (this.registroForm.valid) {
      this.registroService.registrar(this.registroForm.value as RegistroRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.registroError = errorData;
        },
        complete: () => {
          console.info("Registro completo");
          this.router.navigateByUrl('/home');
          this.registroForm.reset();
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
      alert("Error");
    }
  }
}