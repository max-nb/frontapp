import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perguntas } from './app.model';



@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  
  baseUrl = "http://localhost:3001/perguntas";

  constructor(private http: HttpClient) { }

  insert(pergunta:Perguntas): Observable<Perguntas>
  {
    return this.http.post<Perguntas>(this.baseUrl, pergunta);
  }

  read(): Observable<Perguntas[]>
  {
    return this.http.get<Perguntas[]>(this.baseUrl);
  }
}

