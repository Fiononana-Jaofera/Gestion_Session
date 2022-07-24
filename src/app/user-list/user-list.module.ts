import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { MenuComponent } from '../core/components/menu/menu.component';
import { UserServiceService } from './services/user-service.service';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    CoreModule 
  ],
  providers:[UserServiceService]
})
export class UserListModule { }
