import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
