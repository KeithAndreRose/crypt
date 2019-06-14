import { AppService } from 'src/app/services/app.service';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  currentSlide: number;
  previousSlide: number;
  selfRef: Element;
  constructor(public elRef: ElementRef, public app:AppService) { }

  ngOnInit() {
    this.currentSlide = 1;
    this.selfRef = this.elRef.nativeElement.children[0];
    this.initTutorial();
  }

  exit($event){
    if(($event.target as HTMLElement).classList.contains('tutorial-wrapper')){
      localStorage.setItem('tutorialEnabled', 'false')
      this.selfRef.remove();
      this.app.router.navigate(['app',this.app.currentKey]);
    }
  }

  initTutorial(){
    setTimeout(()=>{
      this.selfRef.querySelector(`.s-${this.currentSlide}`).classList.add('active-slide');
    },400)
  }

  toggleSlide(slideNumber){
    this.previousSlide = this.currentSlide;
    this.currentSlide = slideNumber;
    if(!this.selfRef.querySelector(`.s-${this.currentSlide}`))
      return this.selfRef.remove()
    this.selfRef.querySelector(`.s-${this.previousSlide}`).classList.remove('active-slide');
    setTimeout(()=>{
      this.selfRef.querySelector(`.s-${this.currentSlide}`).classList.add('active-slide');
    },300)
    localStorage.setItem('tutorialEnabled', 'false')
  }

}
