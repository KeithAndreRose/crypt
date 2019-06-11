import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  @Output() navEvent = new EventEmitter<Object>();
  @Input() chestKey: String;
  constructor(public app: AppService) {}

  ngOnInit() {}

  signOut() {
    this.app.signOut();
  }

  toggleMainMenu() {
    this.navEvent.emit({ method: "toggleMainMenu" });
  }

  brandClick() {
    if (document.body.clientWidth < 701) this.toggleMainMenu();
    else this.app.router.navigate(["app"]);
  }

  toggleTheme() {
    return this.app.themer.toggleTheme();
  }

  search(input: string) {
    this.app.router.navigate(["app", input]);
  }
}
