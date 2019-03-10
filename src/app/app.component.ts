import {Component, OnInit} from '@angular/core';
import {Alert} from "../classes/alert";
import {AlertService} from "./service/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eDoc';
  public alerts: Array<Alert> = []

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.alerts.subscribe(alert=>{
      this.alerts.push(alert)
    })
  }


}
