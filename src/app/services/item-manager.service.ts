import { FirebaseService } from './firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd} from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Rabbit } from 'crypto-js'
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemManagerService implements OnInit {
  defaultKey: String = "Me";

  focusedItem: Item = null;
  currentKey;
  currentItemID;
  items: Item[];

  itemChest: Subscription;
  urlParams: Subscription;
  urlEvents: Subscription;

  constructor(public router: Router, public route: ActivatedRoute, public auth:AuthService, public db:FirebaseService) {
    this.urlParams = this.route.paramMap.subscribe(params => {
      console.log(params)
      if (params.has("key")) this.currentKey = params.get("key");
      else {
        this.currentKey = this.defaultKey;
        this.router.navigate(["app", this.currentKey]);
      }
      if (params.has("id")) this.currentItemID = params.get("id");
      this.getItems(this.currentKey);
    });
  
    this.urlEvents = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e)
        this.currentItemID = e.url.split("/")[3];
        this.getItems(e.url.split("/")[2] ? e.url.split("/")[2] : this.defaultKey);
      }
    });
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.urlEvents.unsubscribe();
    this.urlParams.unsubscribe();
    this.itemChest.unsubscribe();
  }

  focusItem(item){
    this.focusedItem = item;
  }
  
  unfocusItem(){
    this.focusedItem = null;
    this.router.navigate(['app',this.currentKey])
  }

  getItems(key) {
    this.currentKey = key;
    console.log("Getting Items for:", key);
    this.itemChest = this.db.getItems(key).subscribe(items => {
      this.items = items.reverse();
      this.checkItemFocus();
    });
  }

  checkItemFocus() {
    if (!this.currentItemID) {
      return this.unfocusItem();
    }
    const item = this.items.find(item => item.id == this.currentItemID);
    if (item) this.focusItem(item);
    else this.unfocusItem();
  }

  updateItem(refItem,updatedItem:Item){
    const item:Item = this.stampItem(refItem,updatedItem)
    // console.log(item);
    this.db.updateItem(item, this.currentKey);
    this.unfocusItem();
  }

  stampItem(itemBase:Item, newItem:Item){
    const itemCopy:Item = itemBase;
    itemCopy.title = Rabbit.encrypt(newItem.title, this.auth.secretKey).toString();
    itemCopy.tags = Rabbit.encrypt(newItem.tags, this.auth.secretKey).toString();
    itemCopy.content = Rabbit.encrypt(newItem.content, this.auth.secretKey).toString();
    itemCopy.locationKey = this.currentKey;
    itemCopy.lastModified = Date();
    itemCopy.owner = this.auth.userData.uid;
    itemCopy.func = this.auth.func;
    return itemCopy;
  }

  createItem() {
    const date = Date()
    const id = Date.parse(date)/1000;
    return { id: id.toString(), date: date, title: "", content: ""} as Item;
  }


}
