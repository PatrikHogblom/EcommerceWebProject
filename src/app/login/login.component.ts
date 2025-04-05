import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';

@Component({
  selector: 'app-login',
  imports: [CommonModule, DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = true; // Toggle for password visibility

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      // name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // city: [''],
      // role: ['USER']
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
}

handleSubmit(): void
{
  if (this.loginForm.invalid) {
    this.showSnackbar('Please fill in all required fields', 'Close', 'error-snackbar');
    return;
  }
    this.usersService.login(this.loginForm.get('email')!.value, this.loginForm.get('password')!.value).subscribe({
      next: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            console.log(" test: " + response);
            this.showSnackbar('User logged successfully', 'Close', 'success-snackbar');
            this.router.navigate(['/updateuser']);
          },
          error: (error) => {
            const errorMessage = typeof error.error === 'string' ? error.error : error.error?.message || 'An error occurred';
            this.showSnackbar(errorMessage, 'Close', 'error-snackbar');
          }
    });


  // this.usersService.register(this.loginForm.value).subscribe({
  //   next: () => {
  //     this.showSnackbar('User registered successfully', 'Close', 'success-snackbar');
  //     this.router.navigate(['/login']);
  //   },
  //   error: (error) => {
  //     const errorMessage = typeof error.error === 'string' ? error.error : error.error?.message || 'An error occurred';
  //     this.showSnackbar(errorMessage, 'Close', 'error-snackbar');
  //   }
  // });
}

private showSnackbar(message: string, action: string, panelClass: string) {
this.snackBar.open(message, action, {
  duration: 5000,
  panelClass: [panelClass],
});
}

}
