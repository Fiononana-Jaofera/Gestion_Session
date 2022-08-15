import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { AuthService } from '../auth/services/auth.service';
import { AdminService } from '../shared/services/admin/admin.service';


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
  providers:[AuthService, AdminService]
})
export class UserListModule { }
