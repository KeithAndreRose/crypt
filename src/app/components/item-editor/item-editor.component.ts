import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnInit {
  @Input() item:Item;
  @Output() itemEditorEmitter = new EventEmitter<Object>();
  
  constructor() { }

  ngOnInit() {
  }


  closeItem($event){
    if(($event.target as HTMLElement).classList.contains('item-editor-wrapper')){
      const eventPacket = {
        method: "close item",
        data: { item: this.item }
      };
      this.itemEditorEmitter.emit(eventPacket)
    }
  }


}
