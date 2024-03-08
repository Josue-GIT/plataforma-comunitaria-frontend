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

  agregarQueja(queja: Queja): Observable<Queja> {
    return this.http.post<Queja>(this.apiUrl + '/guardar', queja);
  }
  
  eliminarQueja(quejaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${quejaId}`);
  }
}
