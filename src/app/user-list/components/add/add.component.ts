import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddComponent>, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  optionList!:string[]
  userData!:FormGroup
  ngOnInit(): void {
    this.optionList=[
      "L3-MISA",
      "M1-MISA",
      "M2-MISA",
    ]
    this.initForm()
  }
  initForm(){
    this.userData = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      groupe: ['', Validators.required]
    })
  }
  onNoClick():void{
    this.dialogRef.close()
  }
  onSubmit(){
    this.dialogRef.close({
      data: {
        nom: this.userData.get('nom')?.value,
        prenom: this.userData.get('prenom')?.value,
        email: this.userData.get('email')?.value,
        groupe: this.userData.get('groupe')?.value
      }
    })
  }

}
