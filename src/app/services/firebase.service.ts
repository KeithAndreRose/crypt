import { Injectable } from "@angular/core";
// import { AngularFirestore } from "@angular/fire/firestore";
import { Item } from "../models/item";
import { AuthService } from "./auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  user: any;

  constructor(public auth: AuthService, public afAuth: AngularFireAuth) {}

  // ! CRITICAL PROBLEM: BEING CALLED BEFORE FULLY INITALIZED
  // ! Refactor

  verifyUser() {
    this.user = this.auth.getUserData();
    // console.log(this.user)
    return this.user && navigator.onLine;
  }

  getKeyring() {
    if (this.verifyUser())
      return this.auth.afs.doc(`users/${this.user.uid}`).valueChanges();
  }

  updateKeyring(keyring) {
    if (this.verifyUser()) {
      // this.logInteraction();
      return this.auth.afs.doc(`users/${this.user.uid}`).update({ keyring });
    }
  }

  getItems(locationKey) {
    if (this.verifyUser()) {
      return this.auth.afs
        .collection(`posts/${this.user.uid}/${locationKey}`)
        .valueChanges();
    }
  }

  async updateItem(item: Item, locationKey) {
    const itemID = item.id;
    let items: Item[] = localStorage.getItem(locationKey) ? JSON.parse(localStorage.getItem(locationKey)) : [];
    const i = items.findIndex(item => item.id === itemID);
    console.log(items)
    console.log(i)
    if (i !== -1) items[i] = item;
    else items.push(item);

    if (this.verifyUser()) {
      return this.auth.afs
        .doc(`posts/${this.user.uid}/${locationKey}/${itemID}`)
        .set(item);
    } else {
      console.log('saving to local', items)
      localStorage.setItem(locationKey, JSON.stringify(items));
      return await items;
    }
  }

  async deleteItem(itemId: String, locationKey) {
    let items: Item[] = JSON.parse(localStorage.getItem(locationKey));
    const i = items.findIndex(item => item.id === itemId);
    items.splice(i, 1);
    localStorage.setItem(locationKey, JSON.stringify(items));

    if (this.verifyUser()) {
      return await this.auth.afs
        .doc(`posts/${this.user.uid}/${locationKey}/${itemId}`)
        .delete();
    } else {
      localStorage.setItem(locationKey, JSON.stringify(items));
      return await items;
    }
  }

  archiveItem(item: Item, locationKey) {
    if (this.verifyUser()) {
      // this.logInteraction();
      this.auth.afs
        .doc(`posts/${this.user.uid}/${locationKey}::archive/${item.id}`)
        .set(item);
      return this.auth.afs
        .doc(`posts/${this.user.uid}/${locationKey}/${item.id}`)
        .delete();
    }
  }

  getUserProfileData() {
    if (this.verifyUser()) {
      return this.auth.afs.doc(`users/${this.user.uid}`).valueChanges();
    }
  }
}
