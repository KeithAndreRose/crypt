import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  
  constructor(public app: AppService) { }

  ngOnInit() {
  }

  signIn(){
    if(this.app.authorizer.getUserData())
      return this.app.router.navigate(['app', this.app.currentKey])
    else
      this.app.googleAuth();
  }
}
