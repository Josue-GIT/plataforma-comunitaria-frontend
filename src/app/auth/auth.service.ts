import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private loggedInUser: any;
  constructor(private http: HttpClient) {}
  private loggedIn = new BehaviorSubject<boolean>(false);
  login(credentials: any): Observable<any> {
    this.loggedIn.next(true);
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUserId(): number | null {
    return this.loggedInUser ? this.loggedInUser.id : null;
  }

  logout(): void {
    this.loggedIn.next(false);
  }
}