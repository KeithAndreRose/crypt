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
  name: string = 'Authorization';
  userData: any;
  secretKey: string = 'wasd';
  func: string = 'v0';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public notifier:NotificationService,
  ) {
    this.afAuth.authState.subscribe(user => {
      user ? console.log(user) : console.log("No User Profile");
      this.userData = user ? user : null;
      user ? localStorage.setItem("user", JSON.stringify(this.userData)) : 0;
    });
  }

  getUserData() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // Sign in with Google
  async googleAuth() {
    return await this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async authLogin(provider) {
    return await this.afAuth.auth.signInWithPopup(provider)
      .catch( err => this.notifier.notify(err, 'bad', this.name));
  }

  // Sign out
  async signOut() {
    const logout = await this.afAuth.auth.signOut()
      .catch(err => this.notifier.notify(err, 'bad', this.name))
    this.userData = null;
    return localStorage.removeItem('user');
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
