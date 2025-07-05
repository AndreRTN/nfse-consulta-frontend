import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NfseData {
  numeroNfse?: string;
  numeroCredito?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NfseService {
  private apiUrl = 'http://localhost:8084/api'; 

  constructor(private http: HttpClient) {}

  consultarPorNumeroNfse(numeroNfse: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/creditos/${numeroNfse}`);
  }

  consultarPorNumeroCredito(numeroCredito: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/creditos/credito/${numeroCredito}`);
  }
}