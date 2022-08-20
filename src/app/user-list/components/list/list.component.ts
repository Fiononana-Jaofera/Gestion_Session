import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { BehaviorSubject, Observable, Subscription} from 'rxjs';
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
  
  dataAdmin!:Observable<any>
  listUser!:Observable<User[]>

  @ViewChild(MatPaginator) paginator!: MatPaginator

  columnsToDisplay!:any
  dataSource!:MatTableDataSource<User>
  subscription!:Subscription
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
          this.listUser.subscribe(item => {
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
      this.subscription = this.adminService.getAdminFromServer().subscribe(data => {
            if(data.authorization == true){
              this.dataAdmin = new Observable<any>( myobserver =>{
                myobserver.next(data.user)
              })
              this.listUser = new Observable<User[]>( myobserver =>{
                myobserver.next(data.userList)
              })
              this.listUser.subscribe(val =>{
                this.dataSource = new MatTableDataSource<User>(val)
              })
            }
            else{
              this.subscription.unsubscribe()
              this.tokenService.clearToken()
              this.router.navigate(['/signIn'])
            }})
    }

}
