import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ItemManagerService } from 'src/app/services/item-manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username = 'test';

  constructor(
    public app: AppService
    ) { 
  }

  ngOnInit() {
    // IF no profile. Redirect to home
  }

  signOut(){
    this.app.signOut();
  }

  terminateAccount(email:string, consent:string, self:HTMLButtonElement){
    if(email === this.app.userData.email && consent === 'delete my account')
      this.app.notifier.notify('You deleted your account', 'good')
    else{
      self.classList.add('failed')
      setTimeout(()=>{
        self.classList.remove('failed')
      },450);
    }

  }

}
