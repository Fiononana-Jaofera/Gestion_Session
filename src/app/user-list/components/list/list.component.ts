import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { BehaviorSubject} from 'rxjs';
import { Admin } from 'src/app/auth/models/admin';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { TokenService } from 'src/app/shared/services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private tokenService: TokenService,
    private router: Router
    ) { }
  
  dataAdmin!:BehaviorSubject<Admin>
  listUser!:BehaviorSubject<User[]>

  @ViewChild(MatPaginator) paginator!: MatPaginator

  columnsToDisplay!:any
  dataSource!:MatTableDataSource<User>

  ngOnInit(): void {
    this.getDataFromServer()
    this.columnsToDisplay = ['Nom', 'Prenom', 'Groupe', 'email']
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      height: '500px'
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.adminService.insertNewUser(res.data).subscribe(response =>{
        if(response.status == 'user saved in database'){
          this.listUser.asObservable().subscribe(item => {
            item.push(res.data)
            this.dataSource = new MatTableDataSource<User>(item)
            this.dataSource.paginator = this.paginator
          })
        }
        else if(response.status == 'email already exist'){
          alert('Veuillez inserez une autre adresse email')
        }
      })
    })
  }

  getDataFromServer(){
    this.adminService.getAdminFromServer()
    this.adminService.Admin$.subscribe(Response=>{
      console.log(Response)
      if(Response.authorization == false){ 
        this.tokenService.clearToken()
        this.router.navigate(['/signIn'])
      }
      this.dataAdmin = new BehaviorSubject<Admin>(Response.user)
      this.listUser = new BehaviorSubject<User[]>(Response.userList)
      this.listUser.asObservable().subscribe(
        item => {
          this.dataSource = new MatTableDataSource<User>(item)
        }
        )
    })
  }

}
