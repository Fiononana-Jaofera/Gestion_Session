import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin';
import { AuthService } from '../../services/auth.service';
import { ListGuard } from 'src/app/user-list/components/list.guard';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private listGuard: ListGuard
    ) { }
  login!: FormGroup;
  hide!:boolean;
  admin!:Admin;
  adminInvalid!:boolean;
  ngOnInit(): void {
    this.hide = true
    this.adminInvalid = false
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
    console.log(typeof(this.login.value));
    this.authService.verifyLogin(this.login.value).subscribe(admin => {
      this.admin = admin
    })
    if(this.admin){
      this.listGuard.autorisation = !this.listGuard.autorisation;
      this.router.navigate(['/list']);
    }
    else{
      this.adminInvalid = true;
    }
  }
}
