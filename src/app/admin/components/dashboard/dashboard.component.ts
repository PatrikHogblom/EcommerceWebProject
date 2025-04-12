import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { DemoAngularMaterialModule } from '../../../DemoAngularMaterialModule';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DemoAngularMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: any[] = [];

  constructor(private adminService: AdminService){}

  ngOnInit() {
    this.getAllProducts();
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

}
