import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { Admin } from '../../models/admin';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
    ) { }
  login!: FormGroup;
  hide!:boolean;
  admin!:Admin;
  ngOnInit(): void {
    this.hide = true
    this.initForm()
  }
  private initForm(){
    this.login = this.fb.group(
      {
        email: ['',[Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }
  onSubmit(){    
    this.authService.verifyLogin(this.login.value).subscribe(response => {
      this.tokenService.saveToken(response.token)
    })
  }
}
