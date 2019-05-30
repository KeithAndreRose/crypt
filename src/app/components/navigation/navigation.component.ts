import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() navEvent = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {

  }

  toggleMainMenu(){
    this.navEvent.emit({method: 'toggleMainMenu'})
  }

  brandClick(){
    if(document.body.clientWidth < 701)
      this.toggleMainMenu()
  }
}
