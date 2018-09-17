import { Injectable } from '@angular/core';
import { User } from '../models/user.model'
import {  Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user: User;
  basicURL: string = "/api";
  subject = new Subject();
  
  constructor(public httpClient: HttpClient,public router:Router) {
    this.user = null;
  }



  login(user:User): void {
    this.httpClient.get(this.basicURL+"/client", {
      headers: {
        "xx-auth": user.password+user.userName
      },
      observe: 'response',
      responseType: 'json'
    }).subscribe(res => {
      if (!res.headers.get("xx-auth")) {
       alert('Invalid username or password');
      }
    else{
       localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(res.headers.get("xx-auth")));
        this.subject.next(this.checkUserLogin());
        this.user = user;
      } 
      
    }, () => {    this.router.navigate(['/bookStore/myAccount/register']); })

  }

  registerUser(newUser: User): void {
    let url: string = this.basicURL + "/client";
    this.httpClient.post(url, newUser,{
      observe: 'response',
      responseType: 'json'
    }).subscribe(res => { 
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem("token", JSON.stringify( res.headers.get("xx-auth")));
      this.subject.next(this.checkUserLogin());
    },
      err => {
        alert("error");
      });
  }

  //return the user log-in or null
  checkUserLogin():User {
    return JSON.parse(localStorage.getItem('user'))
  }

  logout() {
    localStorage.clear();
    this.subject.next(this.checkUserLogin());
  }

}
