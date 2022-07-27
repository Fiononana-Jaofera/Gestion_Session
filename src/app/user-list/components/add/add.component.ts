import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddComponent>, private fb: FormBuilder) { }
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
    console.log(this.userData.value)
  }
}
