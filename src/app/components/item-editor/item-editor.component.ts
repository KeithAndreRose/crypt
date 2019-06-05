import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemManagerService } from 'src/app/services/item-manager.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
  @Input() item:Item;
  
  constructor(public itemManager:ItemManagerService) { }

  ngOnInit() {
  }


  exit($event){
    // Send to item manager
    if(($event.target as HTMLElement).classList.contains('item-editor-wrapper')){
      this.itemManager.unfocusItem();
    }
  }


}
