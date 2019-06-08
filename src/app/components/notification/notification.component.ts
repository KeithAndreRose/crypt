import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notice: String;
  self: HTMLElement;
  constructor(public elRef:ElementRef) { }

  ngOnInit() {
    // TODO: Animate from right side with message
    // TODO: Display color based on type (ie: Important, Error, Event Change, etc)
    // TODO: If animated out, on click open notifcation wall and position back
    this.self = this.elRef.nativeElement.children[0];
    setTimeout(()=>{
      this.self.classList.add('active');
    },1000)

    setTimeout(()=>{
      this.self.classList.remove('active');
    },4000)
  }

}
