import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/Evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  private apiUrl = 'http://localhost:8080/eventos/listar'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  obtenerEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }
}