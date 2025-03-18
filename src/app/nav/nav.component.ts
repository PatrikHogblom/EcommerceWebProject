import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  constructor(private readonly UsersService: UsersService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.UsersService.isAuthenticated();
    this.isAdmin = this.UsersService.isAdmin();
    this.isUser = this.UsersService.isUser();
  }


  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;

  logOut():void {
    this.UsersService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
  }

}
