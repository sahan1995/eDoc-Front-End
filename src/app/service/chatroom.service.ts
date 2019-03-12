import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

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

  // selectChatRoom(chatRoomName0):Observable<any>{
  //   this.selectedChatRoom = this.changeChatRomm.switchMap(chatroomId => {
  //
  //     if (chatroomId) {
  //
  //       return this.db.doc(chatRoomName/chatroomId).valueChanges()
  //     }
  //     return Observable.of(null)
  //   })
  //
  //   return;
  // }


  createMessage(msg): void {
    console.log(this.auth.currentUserSnapShot)
    const charoomId = this.changeChatRomm.value
    console.log(charoomId)
    const messageforPatient = {
      message: msg,
      createAt: new Date(),
      sender: this.auth.currentUserSnapShot,
      // sender: {
      //   email:"test@exam.com",
      //   firstName:'Sahan',
      //   id:'W6mLONcvQMOMuWiTC3Td8vPc8Yk1',
      //   lastName:'Rajakruna',
      //   photoUrl:'https://firebasestorage.googleapis.com/v0/b/chatedoc.appspot.com/o/doctor-pic-01.jpg?alt=media&token=38ef1006-e256-483c-a17b-ff852874cb6f'
      // },

    }
    var chatRoom = localStorage.getItem("fname") + 'chat';
    this.db.collection(`${chatRoom}/${charoomId}/messages`).add(messageforPatient)


    var docchatRoom =  charoomId.split("&")[1]+'chat'
    var chat =  charoomId.split("&")[1]+'&'+localStorage.getItem('fname');

    console.log(docchatRoom+'/'+chat)

    const messageforDoctor = {
      message: msg,
      createAt: new Date(),
      sender: this.auth.currentUserSnapShot,
      // sender: {
      //   email:"test@exam.com",
      //   firstName:'Sahan',
      //   id:'W6mLONcvQMOMuWiTC3Td8vPc8Yk1',
      //   lastName:'Rajakruna',
      //   photoUrl:'https://firebasestorage.googleapis.com/v0/b/chatedoc.appspot.com/o/doctor-pic-01.jpg?alt=media&token=38ef1006-e256-483c-a17b-ff852874cb6f'
      // },

    }

    this.db.collection(`${docchatRoom}/${chat}/messages`).add(messageforDoctor)


  }


  getChatRooms(chatRoomName) {
    this.chatrooms = this.db.collection(chatRoomName).valueChanges()
  }
}
