import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { TokenService } from 'src/app/shared/services/token/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private tokenService:TokenService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    
  }
}
