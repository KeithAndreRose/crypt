import { Injectable } from '@angular/core';
import { theme } from "../models/theme";

@Injectable({
  providedIn: 'root'
})
export class CssThemeingService {
  colorTheme = 'light';

  constructor() {
    // TODO: parse a saved theme state
    this.applyTheme(theme[this.colorTheme])
  }
  
  toggleTheme(){
    console.log('toggling theme')
    this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(theme[this.colorTheme]);
  }
  
  applyTheme(theme){ 
    document.documentElement.style.setProperty('--mainAccent', theme['mainAccent'])
    document.documentElement.style.setProperty('--mainTextColor', theme['mainTextColor'])
    document.documentElement.style.setProperty('--mainTransparent', theme['mainTransparent'])
  }
}
