import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queja } from '../model/Queja';
@Injectable({
  providedIn: 'root'
})
export class QuejaService {
  private apiUrl = 'http://localhost:8080/quejas'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  obtenerQuejas(): Observable<Queja[]> {
    return this.http.get<Queja[]>(this.apiUrl + '/listar');
  }

  registrarQueja(queja: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, queja);
  }

  editarQueja(quejaId: number, queja: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${quejaId}`, queja);
  }
  
  eliminarQueja(quejaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${quejaId}`);
  }
}
