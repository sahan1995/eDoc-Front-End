import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Alert} from "../../classes/alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts:Subject<Alert> = new Subject<Alert>()


  constructor() { }
}
