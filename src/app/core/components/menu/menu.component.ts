import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private tokenService:TokenService
  ) {
    this.time = new Observable<number>(
      item => {
        let exp = this.tokenService.getDecodedAccessToken(this.tokenService.getToken()).exp
        let intervalId = setInterval(()=>{
          item.next(exp*1000-Date.now())
          if(exp*1000-Date.now()==0){
            clearInterval(intervalId)
          }
        }, 1)
      }
    )
    this.time.subscribe(value =>{
      this.session = new Date(value)
    })
  }

  ngOnInit(): void {
  }
  time:Observable<number>
  session!:Date
}
