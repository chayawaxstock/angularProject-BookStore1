import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/models/book.model';
import { BookStoreService } from '../../shared/services/book-store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  bookList: Book[];
  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {

    //if click on the button go back to list i want with the search
    if (this.bookStoreService.statusSearch == 1) {
      document.getElementById("search").setAttribute("value", this.bookStoreService.search)
      this.bookStoreService.getBooks(this.bookStoreService.search).subscribe(res => { this.bookList = res["items"]; }, err => { });
    }
    else
      this.bookStoreService.getBooks().subscribe(res => { this.bookList = res["items"]; }, err => { });
    this.bookStoreService.statusSearch = 0;
  }

  search(keySearch) {
    this.bookStoreService.getBooks(keySearch).subscribe(res => { this.bookList = res["items"]; }, err => { });
  }
}
