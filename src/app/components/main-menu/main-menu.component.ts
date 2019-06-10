import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  keyring = [];

  constructor( public app:AppService) { }

  ngOnInit() {
  }

  saveToKey(key){
    let iKey = this.keyring.find(e => e.key === key)
    if(!iKey){
      this.keyring.push({key:key})
      localStorage.setItem('keyring',JSON.stringify(this.keyring))
      this.app.manager.db.updateKeyring(this.keyring)
    } else{
      console.log(`Keyring already contains "${key}"`)
    }
  }

  deleteFromKeyring(key){
    let i = this.keyring.find(e => e.key === key);
    i = this.keyring.indexOf(i);
    this.keyring.splice(i,1);
    localStorage.setItem('keyring',JSON.stringify(this.keyring));
    this.app.manager.db.updateKeyring(this.keyring);
  }

}
