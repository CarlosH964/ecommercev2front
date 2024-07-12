import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemApi {
  id: number;
  objectId: number;
  name: string;
  description: string;
  customer: string;
  price: number;
  stock: number;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private baseUrl = 'http://localhost:5146/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginRequest = { email, password };
    return this.http.post<any>(`${this.baseUrl}/Users/login`, loginRequest);
  }

  register(data?: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/Users`, data);
  }
}