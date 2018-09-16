import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Book } from '../models/book.model';
import { VolumeInfo } from '../models/volum-info.model';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
 
  
  subjectCart=new Subject();
  book:VolumeInfo;
  //basicURL:string="https://book-store-angular-28249.herokuapp.com/api";
   basicURL:string="http://localhost:8000/api";
  bookList:Book[];
  search:string;
  //check if use search and go to product detail and want to go back with search
  statusSearch: number;

  constructor(public httpClient:HttpClient) {
    
   }

   getBooks(searchKey?:string):Observable<Book[]>{
    if(!searchKey)
      searchKey="a";
    this.search=searchKey;
    return this.httpClient.get<Book[]>(this.basicURL+"/book/name/"+searchKey);
   }

   
   
   //return array of products in my cart
   getMyCart()
   {
    let listBook = localStorage.getItem("myCart");
    return (listBook) ? JSON.parse(listBook) : [];
   }

   removeBookFromMyCart(book:VolumeInfo)
   {
    let bookList:VolumeInfo[] = this.getMyCart();
    bookList.splice(book['id'],1);
    localStorage.setItem("myCart", JSON.stringify(bookList));
    this.subjectCart.next(this.getMyCart())
   }

   updateCountInCart(book: VolumeInfo): any {
    let bookList:VolumeInfo[] = this.getMyCart();
    bookList.forEach((element:VolumeInfo) => {
      if(element.title==book.title&&book.subtitle==element.subtitle)
      {
        element["count"]=book["count"];
      }
    });
    localStorage.setItem("myCart", JSON.stringify(bookList));
  }

   addBookToMyCart(book:VolumeInfo)
   {
     let isInMyCart=0;
     let bookList:VolumeInfo[] = this.getMyCart();
      bookList.forEach((element:VolumeInfo) => {
      if(element.title==book.title&&book.subtitle==element.subtitle)
      {
        element["count"]=element["count"]+1;
        isInMyCart=1;
      }
    });
    if(!isInMyCart)
    {
        book.id=bookList.length;
        if(!book['count'])
           book['count']=1;
        bookList.push(book);
    }
    localStorage.setItem("myCart", JSON.stringify(bookList));
    this.subjectCart.next(this.getMyCart())
   }

   removeAllMyCart()
   {
    localStorage.setItem("myCart", '');
    this.subjectCart.next(this.getMyCart())
   }

 
}
