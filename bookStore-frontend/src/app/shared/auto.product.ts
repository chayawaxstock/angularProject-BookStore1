import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BookStoreService } from './services/book-store.service';

@Injectable({ providedIn: 'root' })
export class AuthProduct implements CanActivate {

    constructor(private router: Router,private bookService:BookStoreService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


        if(this.bookService.book)
        {
          //have detail to book
            return true;
        }
        // not allow to move to productDetails
        this.router.navigate(['/bookStore/products']);
        return false;
    }
}