import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class VideoChatService {


  private anotherKey = new BehaviorSubject<String>('');
  private calling = false;
  cast = this.anotherKey.asObservable();
  constructor() { }

  addKey(key){
    this.anotherKey.next(key);
  }

  makeCall(){
    this.calling = true
  }


}
