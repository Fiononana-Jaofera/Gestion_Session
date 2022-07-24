import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SingInComponent } from './component/sing-in/sing-in.component';

const routes: Routes = [
  {
    path: '',
    component: SingInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
