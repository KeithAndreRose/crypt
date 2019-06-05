import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item";
import { FirebaseService } from "src/app/services/firebase.service";
import { ItemManagerService } from 'src/app/services/item-manager.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // Default Chest
  defaultKey: String = "Me";


  currentItemID;

  items: Item[];

  itemChest: Subscription;
  urlParams: Subscription;
  urlEvents: Subscription;


  constructor(
    public firebase: FirebaseService,
    public router: Router,
    public route: ActivatedRoute,
    public itemManager:ItemManagerService
  ) {}

  ngOnInit() {
    this.urlParams =this.route.paramMap.subscribe(params => {
      if (params.has("key"))
        this.itemManager.currentKey = params.get("key");
      else{
        this.itemManager.currentKey = this.defaultKey;
        this.router.navigate(['app',this.itemManager.currentKey]);
      }
      if (params.has("id"))
        this.currentItemID = params.get('id')
      this.getItems(this.itemManager.currentKey)
    });

    this.urlEvents = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentItemID = e.url.split("/")[3];
        this.checkItemFocus()
      }
    });

  }

  ngOnDestroy(){
    this.urlEvents.unsubscribe();
    this.urlParams.unsubscribe();
    this.itemChest.unsubscribe();
  }

  openItem(item){
    console.log(item.id)
    const itemKey = item.id;
    this.router.navigate(["app", this.itemManager.currentKey, itemKey]);
  }

  getItems(key){
    this.itemManager.currentKey = key;
    console.log('Getting Items for:',key)
    this.itemChest = this.firebase.getItems(key).subscribe(items => {
      this.items = items.reverse();
      this.checkItemFocus()
    });
  }
  
  checkItemFocus(){
    if(!this.currentItemID){
      return this.itemManager.unfocusItem();
    }
    const item = this.items.find(item => item.id == this.currentItemID)
    if(item)
      this.itemManager.focusItem(item)
    else
      this.itemManager.unfocusItem()
  }

  textChange(textarea: HTMLTextAreaElement) {
    console.log(textarea.scrollHeight);
    textarea.style.height = "200px";
    textarea.style.height = textarea.scrollHeight + "px";
  }
}
