import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public todaysDate: string;

  //---------------------------------
  constructor() { }

  //---------------------------------
  ngOnInit() {

    //Get today's year

    let date: Date = new Date();
    let year: string = date.getFullYear().toString();
    this.todaysDate = year;

  }
  //---------------------------------  
  backToTop() {
    window.scrollTo(0, 0);
  }
  //---------------------------------


}
