import { Component, Input } from '@angular/core';
import { BookStoreService } from '../../shared/services/book-store.service';
import { VolumeInfo } from '../../shared/models/volum-info.model';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent {
  
  @Input() book: VolumeInfo;
  constructor(public bookService: BookStoreService) { }

  removeBookMyCart() {
    this.bookService.removeBookFromMyCart(this.book);
  }

  changeCountInCart(count:number)
  {
    if(count==0)
    {
    this.removeBookMyCart();
    return;
     }
    this.book["count"]=count;
    this.bookService.updateCountInCart(this.book);
  }

}
