import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/models/item";
import { ItemManagerService } from "src/app/services/item-manager.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // Default Chest

  constructor(public router: Router, public itemManager: ItemManagerService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  openItem(item) {
    console.log(item.id);
    const itemKey = item.id;
    this.router.navigate(["app", this.itemManager.currentKey, itemKey]);
  }

  textChange(textarea: HTMLTextAreaElement) {
    console.log(textarea.scrollHeight);
    textarea.style.height = "200px";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  saveItem(
    $event: FocusEvent,
    title: HTMLInputElement,
    tags: HTMLInputElement,
    content: HTMLTextAreaElement
  ) {
    if (!$event.relatedTarget) {
      const item = {
        title: title.value,
        tags: tags.value,
        content: content.value
      };
      if(item.title === '' && item.tags === '' && item.content === '')
        return console.log('Empty item will not be saved')
      this.itemManager.updateItem(this.itemManager.createItem(), item);
      title.value = "";
      tags.value = "";
      content.value = "";
      content.style.height = "1rem";
    }
  }
}
