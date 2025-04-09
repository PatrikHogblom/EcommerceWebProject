import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterOutlet, RouterLink, DemoAngularMaterialModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.authStatus$.subscribe(() => {
      this.isAuthenticated = this.usersService.isAuthenticated();
      this.isAdmin = this.usersService.isAdmin();
      this.isUser = this.usersService.isUser();

      console.log("admin? :", this.isAdmin);
      console.log("user? :", this.isUser);
    });

  }


  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  logOut():void {
    this.usersService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }

}
