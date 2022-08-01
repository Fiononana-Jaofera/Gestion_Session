import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { ListGuard } from './components/list.guard';

const routes: Routes = [
  {
    path:'',
    component: ListComponent,
    canActivate: [ListGuard],
    children: [
      {
        path: 'add',
        component: AddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
