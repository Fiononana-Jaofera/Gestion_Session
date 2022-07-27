import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
