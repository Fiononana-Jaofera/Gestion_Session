import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  profilUrl:string
  addUrl:string
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.profilUrl = "http://localhost:3000/getAdmin"
    this.addUrl = "http://localhost:3000/addUser"
  }
  public getAdminFromServer():Observable<any>{
    return this.http.get<any>(this.profilUrl)
  }
  insertNewUser(user: any):Observable<any>{
    return this.http.post<any>(this.addUrl, JSON.stringify({
      token: this.tokenService.getToken(),
      newuser: user
    }))
  }
}
