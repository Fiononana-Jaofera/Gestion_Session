import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router,
  ) { }
  saveToken(token: string):void{
    localStorage.setItem('token', token)
    this.router.navigate(['/list'])
  }
  isLogged():boolean{
    const token = localStorage.getItem('token')
    return !!token
  }
  clearToken():void{
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }
  getToken(): string | null{
    return localStorage.getItem('token')
  }
  getDecodedAccessToken(token:any):any{
    try{
      return jwt_decode(token)
    } catch (Error){
      return null
    }
  }
}
