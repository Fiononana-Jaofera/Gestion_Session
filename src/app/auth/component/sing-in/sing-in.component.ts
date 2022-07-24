import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  login!: FormGroup;
  hide!:boolean
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
    console.log(this.login.value);
  }
}
