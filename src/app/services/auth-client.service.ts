import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth:AngularFireAuth) { }

  login(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password).
      then((userData)=>resolve(userData),(error)=>reject(error))
    })
  }
  Register(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,password).
      then((userData)=>resolve(userData),(error)=>reject(error))
    })
  }
  loginWithGoogle(){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).
      then((userData)=>resolve(userData),(error)=>reject(error))
    })
  }
  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }
  logOut(){
    this.afAuth.auth.signOut();
  }
}
