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

  async getItems(key, id?) {
    if(key === this.currentKey)
      return this.previousKey = key;
    this.previousKey = key;
    this.currentKey = key;
    this.itemChest = await this.db.getItems(key).subscribe(items => {
      console.log("Getting Items for:", key);
      if (items) {
        console.log(items);
        this.items = items.reverse();
        this.checkItemFocus(id);
      }
    });
  }

  deleteItem(item: Item) {
    this.db
      .deleteItem(item.id, item.locationKey)
      .then(() => console.log(`Deleted item ${item.id}`))
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
    await this.db.updateItem(item, this.currentKey);
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
    itemCopy.owner = this.auth.userData.uid;
    itemCopy.func = this.auth.func;
    return itemCopy;
  }

  createItem() {
    const date = Date();
    const id = Date.parse(date) / 1000;
    return { id: id.toString(), date: date, title: "", content: "" } as Item;
  }
}
