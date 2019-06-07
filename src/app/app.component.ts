import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-crypt-app';
  hideNav = false;

  constructor(public elRef: ElementRef){

  }

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
