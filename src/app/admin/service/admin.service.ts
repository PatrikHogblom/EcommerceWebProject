import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  AddCategory(categoryDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "admin/category", categoryDto, {
      headers: this.createAuthorizationHeader(),

    })
  }

  AddProduct(productDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "admin/post-product", productDto, {
      headers: this.createAuthorizationHeader(),

    })
  }

  GetCategories(): Observable<any>{
    return this.http.get(BASIC_URL + "admin/get-categories", {
      headers: this.createAuthorizationHeader(),
    })
  }

  GetProducts(): Observable<any>{
    return this.http.get(BASIC_URL + "admin/get-products", {
      headers: this.createAuthorizationHeader(),
    })
  }

  GetProductsByName(name: any): Observable<any>{
    return this.http.get(BASIC_URL + `admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteProduct(productId:any): Observable<any>{
    return this.http.delete(BASIC_URL + `admin/delete-product/${productId}`, {
      headers: this.createAuthorizationHeader(),

    })
  }


  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + UserStorageService.getToken()
    )
  }
}
