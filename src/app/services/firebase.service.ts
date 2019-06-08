import { Injectable } from '@angular/core';
// import { AngularFirestore } from "@angular/fire/firestore";
import { Item } from "../models/item";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user:any;

  constructor(public authService:AuthService) {
  }

  get verifyUser(){
    return this.authService.getAuth;
  }

  getKeyring(){
    if(this.verifyUser)
      return this.authService.afs.doc(`users/${this.user.uid}`).valueChanges()
  }

  updateKeyring(keyring){
    if(this.verifyUser){
      // this.logInteraction();
      return this.authService.afs.doc(`users/${this.user.uid}`).update({keyring})
    }
  }

  getItems(locationKey){
    if(this.verifyUser){
      return this.authService.afs.collection(`posts/${this.user.uid}/${locationKey}`).valueChanges();
    }
  }

  addItem(item:Item, locationKey){
    if(this.verifyUser){
      // this.logInteraction();
      return this.authService.afs.doc(`posts/${this.user.uid}/${locationKey}/${item.id}`).set(item)
      // return this.authService.afs.collection(`posts/${this.user.uid}/${locationKey}`).add(item);
    }
  }

  updateItem(item:Item, locationKey){
    if(this.verifyUser){
      return this.authService.afs.doc(`posts/${this.user.uid}/${locationKey}/${item.id}`).set(item)
    }
  }

  deleteItem(itemId:String, locationKey){
    if(this.verifyUser){
      // this.logInteraction();
      return this.authService.afs.doc(`posts/${this.user.uid}/${locationKey}/${itemId}`).delete()
    }
  }

  archiveItem(item:Item, locationKey){
    if(this.verifyUser){
      // this.logInteraction();
      this.authService.afs.doc(`posts/${this.user.uid}/${locationKey}::archive/${item.id}`).set(item)
      return this.authService.afs.doc(`posts/${this.user.uid}/${locationKey}/${item.id}`).delete()
    }
  }

  getUserProfileData(){
    if(this.verifyUser){
      return this.authService.afs.doc(`users/${this.user.uid}`).valueChanges()
    }
  }

}
