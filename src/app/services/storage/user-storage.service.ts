import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(TOKEN, JSON.stringify(user));
  }

  static getToken() : string{
    return localStorage.getItem(TOKEN);
  }

  static getUser() : any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId() : string{
    const user = this.getUser();
    if (user == null) {
      return "";
    }
    return user.userId;
  }

  static getUserRole() : string{
    const user = this.getUser();
    if (user == null) {
      return "";
    }
    return user.role;
  }

  static isAdminLoggedIn() : boolean{
    if (this.getToken === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isUserLoggedIn() : boolean{
    if (this.getToken === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == "USER";
  }

  static signOut() : void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}
