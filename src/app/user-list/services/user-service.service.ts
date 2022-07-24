import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { users } from '../components/list/userData';

@Injectable()
export class UserServiceService {
  private __users = new BehaviorSubject<User[]>([])
  constructor() { }
  get user$():Observable<User[]>{
    return this.__users.asObservable()
  }
  public getUserFromServer():void{
    this.__users.next(users)
  }

}
