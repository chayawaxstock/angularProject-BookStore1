import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../../shared/services/book-store.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { VolumeInfo } from '../../shared/models/volum-info.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  book: VolumeInfo;
  titleBook: string
  user: User;

  constructor(private route: ActivatedRoute,
              public bookService: BookStoreService,
              public userService: UserService,
              public router: Router) {
    this.book = this.bookService.book;
  }

  ngOnInit() {
    this.user = this.userService.checkUserLogin();
  }

  addToMyCart() {
    this.bookService.addBookToMyCart(this.book);
    this.backProductsPage();
  }
  
  updateCount(count: string) {
    this.book["count"] =eval(count) ;
  }

  backProductsPage() {
    this.bookService.statusSearch = 1;
    this.router.navigate(['/bookStore/products']);
  }

}
