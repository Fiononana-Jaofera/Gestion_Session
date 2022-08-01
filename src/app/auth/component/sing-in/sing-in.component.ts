import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin';
import { AuthService } from '../../services/auth.service';
import { ListGuard } from 'src/app/user-list/components/list.guard';
import { isEmpty } from 'rxjs';

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
    this.authService.verifyLogin(this.login.value).subscribe(admin => {
      this.admin = admin
      console.log(typeof this.admin)
      if(this.admin?.id){
        console.log('value existant')
        this.listGuard.autorisation = true
        this.router.navigate(['/list'])
      }
      else{
        console.log('value inexistant')
        this.listGuard.autorisation = false
      }
    })
  }
}
