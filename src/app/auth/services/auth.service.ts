import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable()
export class AuthService {
  loginUrl:string
  registerUrl:string
  constructor(private http: HttpClient) {
    this.loginUrl = "http://localhost:3000/login"
    this.registerUrl = "http://localhost:3000/register"
  }
  verifyLogin(admin: Admin):Observable<any>{
    return this.http.post<any>(this.loginUrl, JSON.stringify(admin))
  }
  registerAdmin(admin: Admin):Observable<any>{
    return this.http.post<any>(this.registerUrl, JSON.stringify(admin))
  }
}
