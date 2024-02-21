import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private loggedInUser: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    this.loggedIn.next(true);
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map(user => {
        if (user) {
          this.loggedIn.next(true);
          this.setLoggedInUser(user);
          this.userRole.next(user.rol);
        }
        return user;
      })
    );
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  isLoggedInValue(): boolean {
    return this.loggedIn.getValue();
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getUserRole(): Observable<string | null> {
    return this.userRole.asObservable();
  }
  
  getLoggedInUserId(): number | null {
    return this.loggedInUser ? this.loggedInUser.id : null;
  }

  logout(): void {
    this.loggedIn.next(false);
    this.userRole.next(null);
  }
  
}