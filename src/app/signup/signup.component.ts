// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
// import { AuthService } from '../services/auth/auth.service';
// import { catchError, of, tap } from 'rxjs';

// @Component({
//   selector: 'app-signup',
//   //standalone: true, // ✅ Marking it as standalone
//   imports: [
//     CommonModule,
//     ReactiveFormsModule, // ✅ Required for form validation
//     DemoAngularMaterialModule
//   ],
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent {
//   signupForm: FormGroup;
//   hidePassword = true; // Toggle for password visibility

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private snackBar: MatSnackBar,
//     private router: Router
//   ) {
//     this.signupForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', [Validators.required]]
//     });
//   }

//   togglePasswordVisibility() {
//     this.hidePassword = !this.hidePassword;
//   }

//   onSubmit(): void {  // ✅ Fixed method name
//     if (this.signupForm.invalid) {
//       this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
//         duration: 5000, // Show for 5 seconds
//         panelClass: 'error-snackbar'
//       });
//       return;
//     }

//     const password = this.signupForm.get('password')?.value;
//     const confirmPassword = this.signupForm.get('confirmPassword')?.value;

//     if (password !== confirmPassword) {
//       this.snackBar.open('Passwords do not match.', 'Close', {
//         duration: 0, // Stay open until manually closed
//         panelClass: 'error-snackbar'
//       });
//       return;
//     }

//     this.authService.register(this.signupForm.value).pipe(
//       tap((response) => {
//         this.snackBar.open('Sign-up Successful!', 'Close', {
//           duration: 0
//         }).onAction().subscribe(() => {
//           this.router.navigateByUrl("/auth/login");
//         });
//       }),
//       catchError((error) => {
//         // Log the error to see the response from the backend
//         console.error('Error occurred during sign-up:', error);

//         // Show the error message received from the server, if available
//         const errorMessage = error?.error?.message || 'Signup failed. Please try again.';

//         this.snackBar.open(errorMessage, 'Close', {
//           duration: 0,
//           panelClass: 'error-snackbar'
//         });

//         // Return a default value to complete the observable chain
//         return of(null);
//       })
//     ).subscribe();
//   }
// }
