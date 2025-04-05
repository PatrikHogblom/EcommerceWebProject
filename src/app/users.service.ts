import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = "http://localhost:8080"; //url of our backend application

  constructor(private http: HttpClient) { }

  register(userData:any): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    try
    {
      const response = this.http.post<any>(url, userData, { headers });
      return response;
    }
    catch (error)
    {
      throw error;
    }
  }


  login(email:string, password:string): Observable<any> {
    const url = `${this.BASE_URL}/auth/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    try
    {
      const response = this.http.post<any>(url, {email, password} , { headers });
      return response;
    }
    catch (error)
    {
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
