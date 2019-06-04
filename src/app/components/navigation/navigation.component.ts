import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { CssThemeingService } from 'src/app/services/css-themeing.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() navEvent = new EventEmitter<Object>();
  @Input() chestKey: String;
  constructor(public router:Router, public authService:AuthService, public cssTheme:CssThemeingService) { }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const key = e.url.split('/')[2];
        this.chestKey = key;
      }
    })
  }

  toggleMainMenu(){
    this.navEvent.emit({method: 'toggleMainMenu'})
  }

  brandClick(){
    if(document.body.clientWidth < 701)
      this.toggleMainMenu();
    else
      this.router.navigateByUrl('home');
  }

  toggleTheme(){
    return this.cssTheme.toggleTheme();
  }

  
  // TODO: A key search must navigate to the url (NOT EVENT BUBBLING)

  search(input:string){
    this.router.navigateByUrl(`home/${input}`)
  }

  // search(input: HTMLInputElement) {
  //   this.chestKey = input.value;
  //   const eventPacket = {
  //     method: "searchKey",
  //     data: { chestKey: this.chestKey }
  //   };
  //   this.navEvent.emit(eventPacket);
  // }

}
