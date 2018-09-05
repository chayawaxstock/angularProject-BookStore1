import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  date: number;
  footerMessage: string

  constructor() {
    this.date = new Date().getFullYear();
    this.footerMessage = "all rights reserved Chaya and Chany";
  }

}
