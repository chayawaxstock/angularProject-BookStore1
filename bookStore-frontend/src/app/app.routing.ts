import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthLogin } from './shared/auth.login';
import { AuthProduct } from './shared/auto.product';

const appRoutes: Routes = [
  {
    path: 'bookStore/myAccount', component: AccountComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [AuthLogin] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthLogin] },
    ]
  },
  { path: 'bookStore', component: HomeComponent },
  { path: 'bookStore/home', component: HomeComponent },
  { path: 'bookStore/productsDetails', component: ProductDetailsComponent, canActivate: [AuthProduct] },
  { path: 'bookStore/products', component: ProductsComponent },
  { path: 'bookStore/myCart', component: CartComponent, canActivate: [AuthGuard] },
];
export const routing = RouterModule.forRoot(appRoutes);