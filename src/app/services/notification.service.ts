import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  log = [];
  // TODO: Bind with notifcation component

  constructor() { }
  notify(message){
    this.log.push(message);
    console.log(this.log)
  }

  // TODO: Notfication Wall (Example: The Sims 4)

}
