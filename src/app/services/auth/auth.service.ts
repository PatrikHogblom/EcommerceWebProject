import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/"; //url of our backend application

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post('http://localhost:8080/sign-up', signupRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // Ensure the correct headers are sent
    });
  }

}
