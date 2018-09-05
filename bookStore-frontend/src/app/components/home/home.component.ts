import { Component } from '@angular/core';
import { Adress } from '../../shared/models/Adress.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  adressStore: Adress;

  constructor() {
    this.adressStore = new Adress("Hirsh", 15, "Bnei-Brak");
  }
 
}
