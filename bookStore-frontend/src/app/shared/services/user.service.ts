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
  basicURL: string = "https://book-store-angular-28249.herokuapp.com/api";
  subject = new Subject();
  
  constructor(public httpClient: HttpClient,public router:Router) {
    this.user = null;
  }

  login(user): void {
    this.httpClient.post(this.basicURL + "/login", user).subscribe(
      (res) => {
        localStorage.setItem("user", JSON.stringify(res));
        this.subject.next(this.checkUserLogin());
        this.user = res;
      }, err => {
        this.router.navigate(['/bookStore/myAccount/register']);
      }
    )
  }

  registerUser(newUser: User): void {
    let url: string = this.basicURL + "/register";
    this.httpClient.post(url, newUser).subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res));
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
