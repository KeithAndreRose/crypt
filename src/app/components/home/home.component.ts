import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  textChange(textarea:HTMLTextAreaElement){
    console.log(textarea.scrollHeight)
    textarea.style.height = '200px';
    // Customize if you want
    textarea.style.height = (textarea.scrollHeight) + 'px'; //The weight is 30
  

  }
}
