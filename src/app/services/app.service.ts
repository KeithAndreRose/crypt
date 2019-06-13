import { CssThemeingService } from './css-themeing.service';
/*
 * Top level security and manager
 * Detects network status ['Offline', 'Online'] to direct data flow
 * Inspects state data to authorize + notorize transactions and request
 */

import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from "@angular/router";
import { auth } from "firebase/app";

import { NotificationService } from "./notification.service";
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { ItemManagerService } from './item-manager.service';

@Injectable({
  providedIn: "root"
})
export class AppService {
  online: boolean = navigator.onLine;
  userData: any;
  currentKey: string;
  currentItemID: string;

  urlParams: Subscription;
  urlEvents: Subscription;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public themer: CssThemeingService,
    public manager: ItemManagerService,
    public authorizer: AuthService,
    public notifier: NotificationService
  ) {

    this.userData = this.authorizer.getUserData();
    this.manager.getKeyring();
    this.openUrlSubscription()
      .then(()=>{
        this.openNetworkStatusListeners();
        this.printAppServiceReport();
        if(this.currentKey === undefined)
          this.manager.getItems('Default')
      })
  }

  async openUrlSubscription(){
    this.urlEvents = await this.router.events.subscribe(e => {
      if (e instanceof NavigationStart  && e.url.split("/")[1] === 'app') {
        this.currentKey =  e.url.split("/")[2] ? e.url.split("/")[2] : 'Default';
        this.currentItemID = e.url.split("/")[3];
        console.log('Key:', this.currentKey, 'Id:', this.currentItemID)
        if(this.currentKey === this.manager.previousKey){
          console.log(`Already at ${this.currentKey}`, 'Id:', this.currentItemID)
          return this.currentItemID ? this.manager.checkItemFocus(this.currentItemID) : this.manager.focusedItem = null;
        }
        else{
          console.log('Previous',this.manager.previousKey, 'Next', this.currentKey)
          this.manager.getItems(this.currentKey,this.currentItemID);
        }
      }
    });
  }

  openNetworkStatusListeners(){
    window.addEventListener('offline',()=>{
      this.notifier.notify('Connection: offline')
      this.notifier.notify('Using Local Database')
      this.manager.getItems(this.currentKey,this.currentItemID,'true');
    });

    window.addEventListener('online',()=>{
      this.notifier.notify('Connection: Online')
      this.manager.getItems(this.currentKey,this.currentItemID,'true');
    });
  }
  
  async signOut() {
    await this.authorizer.signOut();
    this.userData = this.authorizer.getUserData();
    this.notifier.notify('Logout Successful')
    this.notifier.notify('Using Local Database')
    this.manager.getItems(this.currentKey,this.currentItemID,'true');
  }
  
  // Sign in with Google
  async googleAuth() {
    await this.authorizer.authLogin(new auth.GoogleAuthProvider());
    this.userData = this.authorizer.getUserData();
    this.notifier.notify('Login Successful');
    this.manager.getItems(this.currentKey,this.currentItemID,'true');
  }


  printAppServiceReport() {
    const report: object = {
      online: navigator.onLine,
      currentKey: this.currentKey,
      currentItemID: this.currentItemID,
      userData: this.authorizer.getUserData(),
    };
    console.log(report);
  }

  async terminateAccount(){
    await this.authorizer.terminateAccount()
    this.userData = this.authorizer.getUserData();
    return setTimeout(()=>{
      this.router.navigate(['promo'])
    },2000) 
  }
}
