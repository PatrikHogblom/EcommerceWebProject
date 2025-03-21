import { UsersService } from './../users.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private readonly usersService: UsersService, private readonly router: Router){}

  formData: any = {
    name: '',
    email: '',
    password: '',
    role: 'USER',
    city: '',
  };
  errorMessage: string = '';

  async handleSumbit()
  {
    //check that all fields aren't empty
    if(!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.city)
    {
      this.errorMessage = 'Please fill in all fields';
      this.showError(this.errorMessage);
      return;
    }

    //confirm registration with user
    const confirmRegister = confirm('Are you sure you want to register the user?');
    if (!confirmRegister) return;

      this.usersService.register(this.formData).subscribe({
        next: (response) => {
          if (response.status === 200)
          {
            alert('User registered successfully');
            this.router.navigate(['/login']);
          }
        },
        error: (error) =>
        {
          const errorMessage = typeof error.error === 'string' ? error.error : error.error?.message || 'An error occurred during registration';
          this.showError(errorMessage);
        }
      });
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 10000);
  }

}
