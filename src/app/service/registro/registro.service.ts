  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, catchError, throwError, tap } from 'rxjs';
  import { RegistroRequest } from './RegistroRequest';
  @Injectable({
    providedIn: 'root'
  })

  export class RegistroService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    registrar(datosRegistro: RegistroRequest): Observable<any> {
      const url = `${this.apiUrl}/usuario/guardar`;

      return this.http.post<any>(url, datosRegistro).pipe(
        tap((userData) => console.log('Usuario registrado con éxito:', userData)),
        catchError(this.handlerError)
      );
    }

    private handlerError(error: HttpErrorResponse) {
      if (error.status === 0) {
        console.error('Se ha producido un error ', error.error);
      } else {
        console.error('Backend retornó el código de estado ', error);
      }
      return throwError(() => new Error('Algo falló. Por favor, inténtelo nuevamente.'));
    }
  }