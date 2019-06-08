import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CssThemeingService } from "src/app/services/css-themeing.service";
import { ItemManagerService } from 'src/app/services/item-manager.service';

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  @Output() navEvent = new EventEmitter<Object>();
  @Input() chestKey: String;
  constructor(
    public router: Router,
    public authService: AuthService,
    public cssTheme: CssThemeingService,
    public manager: ItemManagerService
  ) {}

  ngOnInit() {
    // TODO: Prevent memory leaking
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const key = e.url.split("/")[2];
        this.chestKey = key;
      }
    });
  }

  signOut() {
    this.authService.signOut();
  }

  toggleMainMenu() {
    this.navEvent.emit({ method: "toggleMainMenu" });
  }

  brandClick() {
    if (document.body.clientWidth < 701) this.toggleMainMenu();
    else this.router.navigate(["app"]);
  }

  toggleTheme() {
    return this.cssTheme.toggleTheme();
  }

  search(input: string) {
    this.router.navigate(["app", input]);
  }
}
