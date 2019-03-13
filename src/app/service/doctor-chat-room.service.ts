import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DoctorChatRoomService {

  public chatrooms: Observable<any>
  public changeChatRomm: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public selectedChatRoom: Observable<any>
  public selectedChatroomMessages: Observable<any>


  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    var chatRoom = localStorage.getItem("fname") + 'chat';

    this.selectedChatRoom = this.changeChatRomm.switchMap(chatroomId => {
      console.log(chatroomId)
      if (chatroomId) {
        console.log()
        return this.db.doc(`${chatRoom}/${chatroomId}`).valueChanges();
      }
      return Observable.of(null);
    })

    this.selectedChatroomMessages = this.changeChatRomm.switchMap(chatroomId => {

      if (chatroomId) {

        return this.db.collection(`${chatRoom}/${chatroomId}/messages`, ref => {
          return ref.orderBy("createAt", "asc").limit(100)
        }).valueChanges()
      }
      return Observable.of(null)
    })


    console.log(this.chatrooms)
  }


  getChatRooms(chatRoomName) {
    this.chatrooms = this.db.collection(chatRoomName).valueChanges()
  }

  createMessage(msg): void {
    console.log(this.auth.currentUserSnapShot)
    const charoomId = this.changeChatRomm.value
    console.log(charoomId)
    const messageforPatient = {
      message: msg,
      createAt: new Date(),
      sender: this.auth.currentUserSnapShot,
    }
    var chatRoom = localStorage.getItem("fname") + 'chat';
    this.db.collection(`${chatRoom}/${charoomId}/messages`).add(messageforPatient)


    var patientchatRoom =  charoomId.split("&")[1]+'chat'
    var chat =  charoomId.split("&")[1]+'&'+localStorage.getItem('fname');

    console.log(patientchatRoom+'/'+chat)

    const messageforPatient = {
      message: msg,
      createAt: new Date(),
      sender: this.auth.currentUserSnapShot,
    }

    this.db.collection(`${patientchatRoom}/${chat}/messages`).add(messageforPatient)


  }




}
