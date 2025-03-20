import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = "http://localhost:8080/"; //url of our backend application

  constructor(private http: HttpClient) { }

  async login(email:string, password:string): Promise<any> {
    const url = this.BASE_URL + 'auth/login';
    try {
      const response = await this.http.post<any>(url, {email, password}).toPromise();
      return response;

    }catch(error){
      throw error;
    }
  }

  async register(userData:any): Promise<any> {
    const url = this.BASE_URL + 'auth/register';
    // const headers =  new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    // })

    try {
      const response = await this.http.post<any>("http://localhost:8080/auth/register", userData).toPromise();
      return response;

    }catch(error){
      throw error;
    }
  }

  //Authentication meythods
  logOut():void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  isAuthenticated():boolean{
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin():boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'ADMIN';
    }
    return false;
  }

  isUser():boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'USER';
    }
    return false;
  }






}
