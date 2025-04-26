import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DemoAngularMaterialModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm! : FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder, private snackbar: MatSnackBar){}

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.adminService.GetProducts().subscribe(
      res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteimg;
          this.products.push(element);
        });
      }

    );
  }

  sumbitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.GetProductsByName(title).subscribe(
      res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteimg;
          this.products.push(element);
        });
      }

    );
  }

  deleteProduct(productId:any){
    this.adminService.deleteProduct(productId).subscribe(
      res => {
        console.log(res);
        if(res == null)
        {
          this.snackbar.open('Product deleted Sucessfully!', 'Close', {duration: 5000});
          this.getAllProducts();
        }
        else
        {
          this.snackbar.open(res.message, 'Close', {duration: 5000, panelClass: 'error-snackbar'});
        }
      }
    );
  }

}
