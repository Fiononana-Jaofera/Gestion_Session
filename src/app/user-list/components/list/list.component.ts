import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserServiceService } from '../../services/user-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private userService: UserServiceService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  listUser!:User[]
  columnsToDisplay!:any
  dataSource!:MatTableDataSource<User>
  ngOnInit(): void {
    this.userService.getUserFromServer()
    this.userService.user$.subscribe((item)=>this.listUser=item)
    this.columnsToDisplay = ['Nom', 'Prenom', 'Groupe', 'email']
    this.dataSource = new MatTableDataSource<User>(this.listUser)
    this.ngAfterViewInit()
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator
  }
}
