import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionEventoService {
  private baseUrl = 'http://localhost:8080/peventos'; // La URL base del backend

  constructor(private http: HttpClient) { }

  obtenerEventosUsuario(usuarioId: number): Observable<Evento[]> {
    const url = `${this.baseUrl}/usuario/${usuarioId}`; // Ajusta la ruta de la API según sea necesario
    return this.http.get<Evento[]>(url);
  }

  

  obtenerParticipantesDelEvento(eventoId: number): Observable<any[]> {
    const url = `${this.baseUrl}/evento/${eventoId}`;
    return this.http.get<any[]>(url);
  }

  guardarParticipacion(eventoId: number, usuarioId: number): Observable<any> {
    const url = `${this.baseUrl}/guardar`;
    const body = {
      evento: { id: eventoId },
      usuario: { id: usuarioId }
    };
    return this.http.post<any>(url, body);
  }
  cancelarParticipacion(eventoId: number, usuarioId: number): Observable<any> {
    const url = `${this.baseUrl}/cancelar-participacion/${usuarioId}/${eventoId}`;
    return this.http.delete<any>(url);
  }
}