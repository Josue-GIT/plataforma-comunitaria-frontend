import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propuesta } from '../model/Propuesta';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  private apiUrl = 'http://localhost:8080/propuestas';

  constructor(private http: HttpClient) {}

  obtenerPropuestas(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>(`${this.apiUrl}/listar`);
  }

  registrarPropuesta(propuesta: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, propuesta);
  }

  editarPropuesta(propuestaId: number, propuesta: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${propuestaId}`, propuesta);
  }
  
  eliminarPropuesta(propuestaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${propuestaId}`);
  }

  votar(id: number, voto: number): Observable<void> {
    return new Observable<void>();
  }
}
