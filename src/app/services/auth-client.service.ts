import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then((userDate) => resolve(userDate), (error) => reject(error))
    })
  }

  loginWithGoogle(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then((userData) => resolve(userData), (error) => reject(error))
    })
  }

  getAuth(){
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  register(email:string , password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
          .then(userData => resolve(userData), error => reject(error));
    })
  }
}