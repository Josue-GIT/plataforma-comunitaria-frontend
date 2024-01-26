import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propuesta } from '../model/Propuesta';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  private apiUrl = 'http://localhost:8080/propuestas/listar';

  constructor(private httpClient: HttpClient) {}

  obtenerPropuestas(): Observable<Propuesta[]> {
    return this.httpClient.get<Propuesta[]>(this.apiUrl);
  }

  votar(id: number, voto: number): Observable<void> {
    return new Observable<void>();
  }
}
