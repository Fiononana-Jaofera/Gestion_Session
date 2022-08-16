import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  profilUrl:string
  addUrl:string
  private _admin = new BehaviorSubject<any>({})
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.profilUrl = "http://localhost:3000/getAdmin"
    this.addUrl = "http://localhost:3000/addUser"
  }
  get Admin$():Observable<any>{
    return this._admin.asObservable();
  }
  public getAdminFromServer(){
    this.http.get<any>(this.profilUrl).subscribe(data => {
      this._admin.next(data)
    })
  }
  insertNewUser(user: any):Observable<any>{
    return this.http.post<any>(this.addUrl, JSON.stringify({
      token: this.tokenService.getToken(),
      newuser: user
    }))
  }
}
