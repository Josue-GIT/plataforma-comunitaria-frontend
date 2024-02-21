import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'plataforma-comunitaria-frontend';
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.getUserRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
    });
  }
}
