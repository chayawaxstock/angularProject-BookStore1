import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { BookStoreService } from '../../shared/services/book-store.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  user: User;
  constructor(public userService: UserService,
              public bookService: BookStoreService) {
    this.user = this.userService.checkUserLogin();
    this.userService.subject.subscribe(
      {
        next: (v: any) => {
          this.user = v;
        }
      })
  }

  logout() {
    this.userService.logout();
    this.bookService.subjectCart.next(this.bookService.getMyCart());
  }

}
