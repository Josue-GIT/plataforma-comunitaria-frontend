import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  obtenerPerfil(usuarioId: number): Observable<Usuario> {
    const url = `${this.apiUrl}/usuario/obtenerUsuarioPorId/${usuarioId}`;
    return this.http.get<Usuario>(url);
  }
}