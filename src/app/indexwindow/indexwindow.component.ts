import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexwindow',
  templateUrl: './indexwindow.component.html',
  styleUrls: ['./indexwindow.component.css']
})
export class IndexwindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
   myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

}
