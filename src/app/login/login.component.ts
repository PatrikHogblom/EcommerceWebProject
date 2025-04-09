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
  showPassword: boolean = false; // Toggle for password visibility

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}

handleSubmit(): void
{
  if (this.loginForm.invalid) {
    this.showSnackbar('Please fill in all required fields', 'Close', 'error-snackbar');
    return;
  }

  const username = this.loginForm.get('email')!.value;
  const password = this.loginForm.get('password')!.value;

  this.usersService.login(username, password).subscribe({
    next: (response) =>
    {
      console.log("login API response:", response);

      if (response && response.token)
        {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.showSnackbar('User logged successfully', 'Close', 'success-snackbar');
          this.usersService.notifyLogin();
          this.router.navigate(['/userprofile']);
      } else {
        this.showSnackbar(response.message, 'Close', 'error-snackbar');
      }
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
