import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import {User} from "../../classes/user";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule} from "@angular/fire/firestore";
import { from } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/observable/fromPromise';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService {

  public currentUser:Observable<User|null>
  public currentUserSnapShot:User|null


  constructor(private router:Router,
  private afAuth:AngularFireAuth,
  private db:AngularFirestore
) {

    this.currentUser =this.afAuth.authState
      .switchMap((user)=>{
       if(user){
         return this.db.doc<User>(`users/${user.uid}`).valueChanges();
       }else{
         return Observable.of(null)
       }
      })

    this.setCurrentUserSnapshot();
  }

  public signUp(firstName,lastName,email,password):Observable<boolean>{


    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        .then((user)=>{
          console.log(user)
          console.log(user.user.uid)
          const  userRef : AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          const updatedUser={
            id:user.user.uid,
            email:user.user.email,
            firstName,
            lastName,
            photoUrl:'https://firebasestorage.googleapis.com/v0/b/chatedoc.appspot.com/o/doctor-pic-01.jpg?alt=media&token=38ef1006-e256-483c-a17b-ff852874cb6f'
          }
          // console.log(updatedUser)
          userRef.set(updatedUser)
          // console.log("true")
          return true;
        })
        .catch((err)=>{
          return false;
          console.log(err)
        })
    )
  }


  public logins(email,password):Observable<boolean>{

    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
        .then((user)=>{

          this.setCurrentUserSnapshot();
          console.log(user)
         return true;
        })
        .catch((err=>{
          console.log(err)
          return false;
        }))
    )
  }

  private setCurrentUserSnapshot():void{
    this.currentUser.subscribe(user=>{
      console.log(user)
      this.currentUserSnapShot=user
    })
  }

}


