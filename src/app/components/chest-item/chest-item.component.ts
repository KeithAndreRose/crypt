import { AppService } from 'src/app/services/app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-chest-item',
  templateUrl: './chest-item.component.html',
  styleUrls: ['./chest-item.component.scss']
})
export class ChestItemComponent implements OnInit {
  @Input() item:Item;
  @Output() itemEmitter = new EventEmitter<Object>();
  
  constructor(public app:AppService) { }

  ngOnInit() {
  }

  openItem(item,$event:MouseEvent) {
    if(($event.target as HTMLElement).classList.contains('item-delete-comp'))
      return
    const itemKey = item.id;
    this.app.router.navigateByUrl(`app/${this.app.currentKey}/${itemKey}`);
    console.log(itemKey);
  }

  archiveItem(){
  }

  delete(item:Item){
    this.app.manager.deleteItem(item);
  }
  

}
