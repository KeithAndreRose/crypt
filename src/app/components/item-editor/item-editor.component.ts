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

  exit($event,editedObject){
    // Close it clicked behind editor
    if(($event.target as HTMLElement).classList.contains('item-editor-wrapper')){
      this.itemManager.updateItem(this.item, editedObject)
        .catch(err => this.itemManager.notification.notify('Error saving Item'))
      this.itemManager.router.navigate(['app',this.itemManager.currentKey]);
    }
  }

  mobileExit(editedObject){
    this.itemManager.updateItem(this.item, editedObject)
  }


}
