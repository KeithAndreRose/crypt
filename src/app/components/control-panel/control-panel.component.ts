import { Component, OnInit } from '@angular/core';
import { CssThemeingService } from 'src/app/services/css-themeing.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor(public cssTheme:CssThemeingService) { }

  ngOnInit() {
  }

}
