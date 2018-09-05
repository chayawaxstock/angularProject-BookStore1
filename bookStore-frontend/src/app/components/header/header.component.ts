import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model'
import { BookStoreService } from '../../shared/services/book-store.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  countMyCard: number;

  constructor(private userService: UserService, public bookService: BookStoreService) {
    this.user = this.userService.checkUserLogin();
    this.countMyCard = this.bookService.getMyCart().length;
  }
 
  ngOnInit(): void {
    
    this.userService.subject.subscribe(
      {
        next: (v: any) => {
          this.user = v;
        }
      })

    this.bookService.subjectCart.subscribe(
      {
        next: (v: any) => {
          this.countMyCard = v.length;
        }
      })
  }
}
