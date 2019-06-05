import { ItemManagerService } from './../../services/item-manager.service';
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
  
  constructor(public itemManager:ItemManagerService) { }

  ngOnInit() {
  }

  archiveItem(){
  }

  deleteItem(){
  }
  

}
