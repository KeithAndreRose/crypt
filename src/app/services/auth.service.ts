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
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  name: string = 'Authorization';
  userData: firebase.User;
  userCredentials: User;
  secretKey: string = 'LOCAL';
  func: string = 'v0';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public notifier:NotificationService,
    public router: Router
  ) {
    this.afAuth.authState.subscribe(user => {
      user ? console.log(user) : console.log("No User Profile");
      this.userData = user ? user : null;
      user ? localStorage.setItem("user", JSON.stringify(this.userData)) : 0;

      if(user){
        if(localStorage.getItem("userCredentials")){
          this.userCredentials = JSON.parse(localStorage.getItem('userCredentials'));
          this.secretKey = this.userCredentials.privateKey;
        }
        else
          this.afs.doc(`users/${user.uid}`).valueChanges().subscribe(data => {
            localStorage.setItem('userCredentials', JSON.stringify(data));
            this.userCredentials = data as User;
            this.secretKey = this.userCredentials.privateKey;
          })
      }

      this.secretKey = user ? this.userCredentials.privateKey : 'LOCAL';

    });
  }

  getUserData() : firebase.User {
    return JSON.parse(localStorage.getItem("user"));
  }

  // Sign in with Google
  async googleAuth() {
    return await this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async authLogin(provider) {
    return await this.afAuth.auth.signInWithPopup(provider)
      .then( data => {
        if(data.additionalUserInfo.isNewUser) this.SetUserData(data)
      })
      .catch( err => this.notifier.notify(err, 'bad', this.name));
  }

  // Sign out
  async signOut() {
    const logout = await this.afAuth.auth.signOut()
      .catch(err => this.notifier.notify(err, 'bad', this.name))
    this.userData = null;
    this.userCredentials = null;
    localStorage.removeItem('keyring');
    localStorage.removeItem('tutorialEnabled');
    localStorage.removeItem('userCredentials');
    return localStorage.removeItem('user');
  }

  // Generates a User Model to firestore on creation
  SetUserData(user: auth.UserCredential) {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.user.uid}`);
    const userData: User = {
      credential: user.credential.toJSON(),
      user: user.user.toJSON(),
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
      photoURL: user.user.photoURL,
      emailVerified: user.user.emailVerified,
      publicKey: publicKey,
      privateKey: privateKey
    }
    // TODO: Reserved utility item
    localStorage.setItem('tutorialEnabled','true');
    userRef.set(userData, {merge: true})
    return this.router.navigate(['tutorial'])
  }

  async terminateAccount(){
    const user = this.getUserData();
    await this.afs.doc(`users/${user.uid}`).delete();
    await this.afAuth.auth.currentUser.delete()
      .then(async ()=> {
        this.notifier.notify('Account Terminated', 'good')
        this.notifier.notify('Thank you for trying Crypt 🙂')
        this.userData = null;
        return this.signOut();
      })
      .catch(err => this.notifier.notify(err))
  }

}
