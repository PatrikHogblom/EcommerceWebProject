import { Component } from '@angular/core';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-category',
  imports: [DemoAngularMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss'
})
export class PostCategoryComponent {

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  addCategory() {
    if(this.categoryForm.valid){
      this.adminService.AddCategory(this.categoryForm.value).subscribe(
        (res) => {
          if(res.id != null){

            this.snackbar.open('Category Posted Sucessfully!', 'Close', {
              duration: 5000
            });
            this.router.navigateByUrl('/dashboard');
          }
          else
          {
            this.snackbar.open(res.message, 'Close', {
              duration: 5000,
              panelClass: 'error-snackbar'
            });
            this.router.navigateByUrl('/userprofile');
          }
        }
      )
    }
    else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
