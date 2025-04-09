import { Component, OnInit } from '@angular/core';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userprofile',
  imports: [CommonModule, DemoAngularMaterialModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit
{
  profileInfo: any;
  errorMessage: string = "";

  constructor(private readonly usersService: UsersService, private readonly router: Router, private snackBar: MatSnackBar)
  {

  }

  async ngOnInit(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if(!token)
      {
        throw new Error("No token found");
      }

      this.profileInfo = await this.usersService.getYourProfile(token);

    } catch (error: any) {
      const errorMessage = typeof error.error === 'string' ? error.error : error.error?.message || 'An error occurred';
      this.showSnackbar(errorMessage, 'Close', 'error-snackbar');
    }
  }

  updateProfile(id: string) {
    this.router.navigate(['/update', id]);
  }

  private showSnackbar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [panelClass],
    });
  }
}
