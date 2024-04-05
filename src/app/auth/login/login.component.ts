import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.loginError = localStorage.getItem('loginError') || '';
    localStorage.removeItem('loginError');
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login(): void {
    if (this.loginForm.valid) {
      const { username, password} = this.loginForm.value;
      this.authService.login({ username, password}).subscribe(
        (user) => {
          console.log("inicio de sesión correcto");
          this.router.navigate(['/home']); // Redireccionar al usuario a la página de inicio
        },
        (error) => {
          this.loginError = 'Credenciales no válidas';
          localStorage.setItem('loginError', this.loginError);
          console.log(error);
        }
      );
    }
  }


}
