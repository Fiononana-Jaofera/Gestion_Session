import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from 'src/app/auth/models/admin';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { users } from '../components/list/userData';

@Injectable()
export class UserServiceService {
  private __users = new BehaviorSubject<User[]>([])
  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) {
  }
  get user$():Observable<User[]>{
    return this.__users.asObservable()
  }
  public getUserFromServer(){
    this.__users.next(users)
  }

}
