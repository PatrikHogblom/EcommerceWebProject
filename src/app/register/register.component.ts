import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from './../users.service';
import { CommonModule } from '@angular/common';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DemoAngularMaterialModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  showPassword: boolean = false; // Toggle for password visibility

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      city: [''],
      role: ['USER']
    });
  }

  togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
  }

  handleSubmit(): void {
    if (this.registerForm.invalid) {
      this.showSnackbar('Please fill in all required fields', 'Close', 'error-snackbar');
      return;
    }

    this.usersService.register(this.registerForm.value).subscribe({
      next: () => {
        this.showSnackbar('User registered successfully', 'Close', 'success-snackbar');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        const errorMessage = typeof error.error === 'string' ? error.error : error.error?.message || 'An error occurred';
        this.showSnackbar(errorMessage, 'Close', 'error-snackbar');
      }
    });
  }

  private showSnackbar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [panelClass],
    });
  }
}
