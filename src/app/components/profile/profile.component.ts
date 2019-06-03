import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username = 'test';

  constructor(public authService:AuthService) { 
  }

  ngOnInit() {
    // IF no profile. Redirect to home
  }

  terminateAccount(username:string, consent:string, self:HTMLButtonElement){
    if(username === this.username && consent === 'delete my account')
      console.log('You deleted your account')
    else
      self.classList.add('failed')
      console.log('Oop!')
      setTimeout(()=>{
        self.classList.remove('failed')
      },450);

  }

}
