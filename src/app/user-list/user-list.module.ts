import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { MenuComponent } from '../core/components/menu/menu.component';
import { ListContentComponent } from './components/list-content/list-content.component';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ListContentComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    CoreModule 
  ]
})
export class UserListModule { }
