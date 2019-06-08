import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { User } from "../models/user";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import * as EC from "elliptic/lib/elliptic/ec";
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userData: any;
  secretKey: string = 'wasd';
  func: string = 'v0';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public notification:NotificationService,
  ) {
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        this.userData = null;
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  get getAuth() {
    if(this.isLoggedIn)
      return JSON.parse(localStorage.getItem('user'));
    // else
      // this.signOut();
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result)
        this.getAuth;
        this.router.navigate(['app']);
        this.notification.notify('You have signed in');
        // this.ngZone.run(() => this.router.navigate(['notebook']))
        // this.SetUserData(result.user);
      })
      .catch(error => {
        this.notification.notify(error);
        window.alert(error);
      });
  }

  // Sign out
  signOut() {
    this.afAuth.auth.signOut()
      .then(e => {
        this.userData = null;
        this.router.navigate(['app']);
        return this.notification.notify('You have been signed out');
      });
  }

  // Generates a User Model to firestore on creation
  SetUserData(user) {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      publicKey: publicKey,
      privateKey: privateKey
    }
    return userRef.set(userData, {merge: true})
  }
}
