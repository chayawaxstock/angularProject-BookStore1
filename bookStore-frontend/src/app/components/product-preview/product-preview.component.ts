import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VolumeInfo } from '../../shared/models/volum-info.model';
import { BookStoreService } from '../../shared/services/book-store.service';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})

export class ProductPreviewComponent {

  @Input()
  book: VolumeInfo;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public bookService: BookStoreService) 
              {}

  bookDetails() {
    this.bookService.book = this.book;
    this.router.navigate(['/bookStore/productsDetails']);
  }


}
