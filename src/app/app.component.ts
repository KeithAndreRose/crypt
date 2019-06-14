import { AppService } from 'src/app/services/app.service';
import { Component, ElementRef } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Crypt';
  hideNav = false;

  constructor(public elRef: ElementRef, public notification:NotificationService){

  }

  // TODO: Ask would you like a tutorial

  navEvent(event){
    switch(event.method){
      case 'toggleMainMenu':
        this.toggleMainMenu()
        break;
    }
  }

  toggleMainMenu(){
    let ref:HTMLElement = this.elRef.nativeElement;
    ref.querySelector('.menu-wrapper').classList.toggle('open')
    ref.querySelector('.container').classList.toggle('menu-open')
  }
}
