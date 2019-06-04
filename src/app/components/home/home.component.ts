import { ChestItemComponent } from "./../chest-item/chest-item.component";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // Default Chest
  defaultChest: String = "Me";
  // Current Chest Key
  currentChest: String;
  // Item Bin
  chestItems: Item[] = [];
  // Keyring
  keyring: Array<any>;
  // The focused item
  focusedItem: Item = null;

  isLoading: boolean = true;
  constructor(
    public firebase: FirebaseService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      if (params.has("key")) {
        this.getChest(params.get("key"));
      } else {
        this.getChest(this.defaultChest);
      }
    });

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e);
        const key = e.url.split("/")[2];
        this.getChest(key);
      }
    });




  }

  navigationBarEvent(event) {
    const method = event.method;
    switch (method) {
      case "searchKey":
        this.getChest(event.data.chestKey);
        break;
    }
  }

  itemEvent(event) {
    const method = event.method;
    switch (method) {
      case "delete":
        this.deleteItem(event.data.item);
        break;
    }
  }

  deleteItem(item: Item) {}

  getChest(key) {
    this.focusedItem = null;
    this.router.navigate(["home", key]);
    // TODO: NAVIGATE BY URL;
    if (key === this.currentChest) return;
    this.currentChest = key;
    this.isLoading = true;
    this.firebase.getItems(this.currentChest).subscribe(data => {
      console.log(data);
      this.isLoading = false;
      this.chestItems = data;
      this.chestItems.reverse();
    });
  }

  textChange(textarea: HTMLTextAreaElement) {
    console.log(textarea.scrollHeight);
    textarea.style.height = "200px";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  openItem(chestItem: ChestItemComponent) {
    const itemKey = chestItem.item.id;
    this.router.navigate(["home", this.currentChest, itemKey]);
  }
}
