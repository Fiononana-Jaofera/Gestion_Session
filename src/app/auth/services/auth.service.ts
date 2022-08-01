import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable()
export class AuthService {
  adminUrl:string
  constructor(private http: HttpClient) {
    this.adminUrl = "http://localhost:3000/login"
  }
  verifyLogin(admin: Admin):Observable<Admin>{
    return this.http.post<Admin>(this.adminUrl, JSON.stringify(admin))
  }
}
