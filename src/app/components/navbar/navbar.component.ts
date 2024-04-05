import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent {
  userRole: string | null = null;
  isLoggedIn!: Observable<boolean>;

  constructor(private authService: AuthService,
    private router: Router) { }

  

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  isAdmin(): Observable<boolean> {
    return this.authService.getUserRole().pipe(
      map(role => role === 'ADMIN')
    );
  }
}

