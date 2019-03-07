import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {FirebaseListObservable} from "@angular/fire/database-deprecated";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import * as firebase from 'firebase/app'
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  user :any;
  chatMessages:AngularFireList<ChatMessage[]>
  chatMessage:ChatMessage
  userName : Observable<string>
  constructor(
    private db:AngularFireDatabase,
    private afAuth : AngularFireAuth
  ) {
    // afAuth.authState.subscribe(auth=>{
    //   if(auth!==undefined&&auth!==null){
    //     this.user = auth;
    //   }
    // })
  }

  sendMessage(msg:string){
    const timestap = this.getTimeStamp();
    // const email = this.user.email;
    const email = "test@example.com"
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      // message:msg,
      // timeSent:timestap,
      // userName:this.userName,
      userName:"test-user",
      email:email
    })

    console.log("Called Send Message")
  }

  getMessages():AngularFireList<ChatMessage[]>{


    return this.db.list("/messages",ref => {return ref.limitToLast(25).ref.orderByKey()})


  }


  getTimeStamp(){
    const  now = new Date();
    const  date = now.getUTCFullYear()+'/'+
      (now.getUTCMonth()+1)+'/'+
      now.getUTCDate();

    const  time = now.getUTCHours()+':'+
      now.getUTCMinutes()+':'+
      now.getUTCSeconds();


    return (date+ '  '+time);

  }
}
