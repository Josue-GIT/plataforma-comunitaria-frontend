import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queja } from '../model/Queja';
@Injectable({
  providedIn: 'root'
})
export class QuejaService {
  private apiUrl = 'http://localhost:8080/quejas/listar'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  obtenerQuejas(): Observable<Queja[]> {
    return this.http.get<Queja[]>(this.apiUrl);
  }
}
