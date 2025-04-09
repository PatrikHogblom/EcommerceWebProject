import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = "http://localhost:8080"; //url of our backend application

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) { }

  register(userData:any): Observable<any> {
    const url = `${this.BASE_URL}/auth/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
    });
    try
    {
      const response = this.http.post<any>(url, {email, password} , { headers });
      console.log("login res: " + response);
      return response;
    }
    catch (error)
    {
      throw error;
    }
  }

  //Authentication methods
  logOut():void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.authStatus.next(false); // notify logout
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

  getYourProfile(token: string): Promise<any>
  {
    const url = `${this.BASE_URL}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    try{
      const response = firstValueFrom(this.http.get<any>(url, {headers}));
      return response;
    }catch(error){
      throw error;
    }
  }

  notifyLogin(): void {
    this.authStatus.next(true); // notify login
  }
}
