import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../../shared/services/book-store.service';
import { VolumeInfo } from '../../shared/models/volum-info.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  myCartBook: VolumeInfo[];

  constructor(public bookService: BookStoreService) { 
     this.myCartBook = this.bookService.getMyCart(); }

  ngOnInit() {
    this.bookService.subjectCart.subscribe(
      {
        next: (v: any) => {
          this.myCartBook = v;
        }
      })
  }

  removeAllMyCart()
  {
    this.bookService.removeAllMyCart();
  }

}
