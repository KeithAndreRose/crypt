import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { CssThemeingService } from 'src/app/services/css-themeing.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() navEvent = new EventEmitter<Object>();

  constructor(public router:Router, public authService:AuthService, public cssTheme:CssThemeingService) { }

  ngOnInit() {

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
}
