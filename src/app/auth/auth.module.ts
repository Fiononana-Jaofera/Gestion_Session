import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SingInComponent } from './component/sing-in/sing-in.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    SignUpComponent,
    SingInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
