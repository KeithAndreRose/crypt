import { Injectable } from '@angular/core';
import { theme } from "../models/theme";

@Injectable({
  providedIn: 'root'
})
export class CssThemeingService {
  themeName = 'light';
  activeTheme;

  constructor() {
    // TODO: parse a saved theme state
    this.applyTheme(theme[this.themeName])
  }
  
  toggleTheme(){
    this.themeName = this.themeName === 'light' ? 'dark' : 'light';
    this.applyTheme(theme[this.themeName]);
  }
  
  applyTheme(theme){ 
    this.activeTheme = theme;
    document.documentElement.style.setProperty('--mainAccent', theme['mainAccent'])
    document.documentElement.style.setProperty('--mainTextColor', theme['mainTextColor'])
    document.documentElement.style.setProperty('--mainTransparent', theme['mainTransparent'])
    document.documentElement.style.setProperty('--secondaryTransparent', theme['secondaryTransparent'])
    document.documentElement.style.setProperty('--mainFont', theme['mainFont'])
  }
}
