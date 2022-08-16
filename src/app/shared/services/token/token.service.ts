import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';

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
  startSession():Observable<number>{
    let timer = new Observable<number>(subscribe=>{
      
    })
    return timer
  //   let exp = this.getDecodedAccessToken(this.getToken()).exp*1000
  //   let timer = Date.now()
  //   setInterval(()=>{
  //     timer+=1
  //     if(timer==exp){ 
  //       this.clearToken()
  //       this.router.navigate(['/signIn'])
  //       location.reload()
  //       clearInterval()
  //     }
  //   },1)
  }
}
