//* Responsible for displaying top level exceptions to the user

import { Injectable } from '@angular/core';

export interface Notification{
  message: string;
  type: string;
  referrer: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  log = [];

  constructor() { }

  notify(message, type?, referrer?){
    // TODO: use Telegram model
    const notification: Notification = {message, type, referrer} 
    this.log.push(notification);
    console.log(this.log)
  }

}
