import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Default Chest
  defaultChest: String = 'Me';
  // Current Chest Key
  currentChest: String;
  // Item Bin
  chestItems: Item[] = [];
  // Keyring
  keyring: Array<any>;
  // The focused item
  focusedItem: Item = null;

  isLoading: boolean = true;
  constructor(public firebase: FirebaseService, public router:Router) { }

  ngOnInit() {
    if(this.firebase.verifyUser)
      this.getChest(this.defaultChest);

  }

  navigationBarEvent(event){
    const method = event.method;
    switch(method){
      case 'searchKey':
        this.getChest(event.data.chestKey);
        break;
    }
  }

  itemEvent(event){
    const method = event.method;
    switch(method){
      case 'delete':
        this.deleteItem(event.data.item)
      break;
    }
  }

  deleteItem(item: Item){

  }

  getChest(key){
    this.focusedItem = null;
    // TODO: NAVIGATE BY URL;
    if(key === this.currentChest) return;
    this.currentChest = key;
    this.isLoading = true;
    this.firebase.getItems(this.currentChest).subscribe(data => {
      this.isLoading = false;
      this.chestItems = data;
      this.chestItems.reverse();
    })
  }

  textChange(textarea:HTMLTextAreaElement){
    console.log(textarea.scrollHeight)
    textarea.style.height = '200px';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  }
}
