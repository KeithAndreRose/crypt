import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { Item } from '../models/item';
@Injectable({
  providedIn: 'root'
})
export class ItemManagerService implements OnInit {
  focusedItem: Item = null;
  currentKey;
  constructor(public router: Router) {

  }

  ngOnInit(){
  }

  focusItem(item){
    this.focusedItem = item;
  }
  
  unfocusItem(){
    this.focusedItem = null;
    this.router.navigate(['app',this.currentKey])
  }

  createItem() {
    const date = Date()
    const id = Date.parse(date)/1000;
    console.log(date, id)
    let item: Item = { id: id.toString(), date: date, title: "", content: ""};
  }


}
