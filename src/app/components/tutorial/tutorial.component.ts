import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  currentSlide: Number;
  previousSlide: Number;
  selfRef: Element;
  constructor(public elRef: ElementRef) { }

  ngOnInit() {
    this.currentSlide = 1;
    this.selfRef = this.elRef.nativeElement.children[0];
    this.initTutorial()
  }

  initTutorial(){
    // console.log(this.selfRef);
    this.selfRef.querySelector(`.s-${this.currentSlide}`).classList.add('active-slide');
  }

  toggleSlide(slideNumber){
    this.previousSlide = this.currentSlide;
    this.currentSlide = slideNumber;
    if(!this.selfRef.querySelector(`.s-${this.currentSlide}`))
      return this.selfRef.remove()
    this.selfRef.querySelector(`.s-${this.previousSlide}`).classList.remove('active-slide');
    setTimeout(()=>{
      this.selfRef.querySelector(`.s-${this.currentSlide}`).classList.add('active-slide');
    },400)
  }

}
