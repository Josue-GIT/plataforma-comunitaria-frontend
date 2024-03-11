import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  private apiUrl = 'http://localhost:8080/eventos'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/listar`);
  }
  
  registrarEvento(evento: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardar`, evento);
  }

  editarEvento(eventoId: number, evento: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${eventoId}`, evento);
  }
  
  eliminarEvento(eventoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${eventoId}`);
  }
}