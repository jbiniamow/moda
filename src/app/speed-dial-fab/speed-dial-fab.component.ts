import { Component, OnInit, Input } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
  @Input()
  public options: any;

  public buttons:any[] = [];

  public fabTogglerState = 'inactive';

  constructor() { }

  public ngOnInit(): void {
    const maxButtons = 6;
    if (this.options.buttons.length > maxButtons) {
      this.options.buttons.splice(5, this.options.buttons.length - maxButtons);
    }
  }

  public showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.options.buttons;
  }

  public hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  public toggle() {
    this.buttons.length
      ? this.hideItems()
      : this.showItems();
  }

  public onButtonClick(btn: any) {
    if (btn.action) {
      return btn.action();
    }
  }

}
