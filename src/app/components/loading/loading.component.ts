import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
// Credit Reference: https://codepen.io/ghost028/pen/ammBrq 
  self: HTMLElement;
  constructor(public elRef: ElementRef) { }

  ngOnInit() {
    this.self = this.elRef.nativeElement;
    let filled = false;
    setInterval(()=>{
      if(!filled)
        this.self.querySelector('svg').classList.add('active')
      else
        this.self.querySelector('svg').classList.remove('active')
      filled = !filled;
    },800)
  }

}
