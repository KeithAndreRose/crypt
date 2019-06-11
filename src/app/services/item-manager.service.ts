import { FirebaseService } from "./firebase.service";
import { AuthService } from "src/app/services/auth.service";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Item } from "../models/item";
import { Rabbit } from "crypto-js";
import { Subscription } from "rxjs";
import { NotificationService } from './notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: "root"
})
export class ItemManagerService {
  defaultKey: String = "Me";

  focusedItem: Item = null;
  previousKey;
  currentKey;
  currentItemID;
  items: Item[];

  keyring;

  itemChest: Subscription;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    public db: FirebaseService,
    public notification: NotificationService
  ) {}

  focusItem(item) {
    this.focusedItem = item;
  }

  unfocusItem() {
    this.focusedItem = null;
    this.router.navigate(['app',this.currentKey]);
  }

  getItems(key, id?,force?) {
    if(key === this.currentKey && !force)
      return this.previousKey = key;
    this.previousKey = key;
    this.currentKey = key;
    console.log("Getting Items for:", key);
    if(this.auth.getUserData() && navigator.onLine){
      this.itemChest = this.db.getItems(key).subscribe(items => {
        if (items) {
          console.log(items);
          this.items = items.reverse();
          localStorage.setItem(this.currentKey,JSON.stringify(this.items))
          this.checkItemFocus(id);
        }
      });
    }
      else{
        this.items = JSON.parse(localStorage.getItem(this.currentKey))
        this.checkItemFocus(id);
      console.log('Getting Local DB')
    }
  }

  deleteItem(item: Item) {
    const ID = item.id;
    const locationKey = item.locationKey
      this.db
        .deleteItem(ID, locationKey)
        .then((e) => {
          if(!this.auth.getUserData())
          console.log(e)
          this.items = e as Item[];
        })
        .catch(e => console.error(e));

  }

  checkItemFocus(id?) {
    if (!id){
      console.log('no defined ID included')
      return this.focusedItem = null;
    }
    const item = this.items.find(item => item.id == id);
    if (item) this.focusItem(item);
    else {
      this.focusItem = null;
      this.notification.notify('Item not found')
    }
  }

  async updateItem(refItem, updatedItem: Item) {
    const item: Item = this.stampItem(refItem, updatedItem);

    await this.db.updateItem(item, this.currentKey)
    .then((data)=>{
      if(!this.db.verifyUser()){
        this.items = data as Item[]
      }
    });
    // this.router.navigate(['app',this.currentKey])
  }

  stampItem(itemBase: Item, newItem: Item) {
    const itemCopy: Item = itemBase;
      
    itemCopy.title = Rabbit.encrypt(
      newItem.title,
      this.auth.secretKey
    ).toString();
    itemCopy.tags = Rabbit.encrypt(
      newItem.tags,
      this.auth.secretKey
    ).toString();
    itemCopy.content = Rabbit.encrypt(
      newItem.content,
      this.auth.secretKey
    ).toString();
    itemCopy.locationKey = this.currentKey;
    itemCopy.lastModified = Date();
    itemCopy.owner = this.auth.getUserData() ? this.auth.getUserData().uid : 'local';
    itemCopy.func = this.auth.func;
    return itemCopy;
  }

  createItem() {
    const date = Date();
    const id = Date.parse(date) / 1000;
    return { id: id.toString(), date: date, title: "", content: "" } as Item;
  }

  getKeyring(){
    if(this.auth.getUserData() && navigator.onLine){
      this.db.getKeyring().subscribe(data => {
        if(data){
          this.keyring = (data as any).keyring
          localStorage.setItem('keyring',JSON.stringify(this.keyring))
        }
      });
    } else {
      this.keyring = localStorage.getItem('keyring') ? JSON.parse(localStorage.getItem('keyring')) : null
    }
  }
}
