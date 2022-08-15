import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrl:string
  private _admin = new BehaviorSubject<any>({})
  constructor(
    private http: HttpClient
  ) {
    this.adminUrl = "http://localhost:3000/getAdmin"
  }
  get Admin$():Observable<any>{
    return this._admin.asObservable();
  }
  public getAdminFromServer(){
    this.http.get<any>(this.adminUrl).subscribe(data => {
      console.log(data)
      this._admin.next(data)
    })
  }
}
