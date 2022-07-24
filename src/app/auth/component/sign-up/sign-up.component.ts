import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { confirmEqual } from '../../validators/confirm-Equal.validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form!:FormGroup
  mdpCtr!:FormControl
  confirmCtr!:FormControl
  mdpForm!:FormGroup
  showMdpError$!:Observable<Boolean>
  hide!:boolean

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.hide = true
    this.mainForm()
    this.initObservable()
  }

  initForm(): void{
    this.mdpCtr = this.fb.control('', [Validators.required, Validators.minLength(7),])
    this.confirmCtr = this.fb.control('', [Validators.required])
    this.mdpForm = this.fb.group(
      {
        mdp: this.mdpCtr,
        vmdp: this.confirmCtr
      }, {validators: confirmEqual("mdp","vmdp")}
    )
  }
  private mainForm(): void{
    this.initForm()
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: this.mdpForm
    })
  }
  private initObservable():void{
    this.showMdpError$ = this.mdpForm.statusChanges.pipe(
      map((etat)=>etat==='INVALID' && this.mdpCtr.value && this.confirmCtr.value && this.mdpForm.hasError('equals'))
    )
  }
  onSubmit(){
    console.log(this.form.value)
  }

}
