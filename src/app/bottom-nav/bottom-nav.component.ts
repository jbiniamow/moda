import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  selected: string;

  constructor() {
    this.selected = '';
  }

  ngOnInit(): void {
  }

  setSelected(select: string): any {
    this.selected = select;
  }

}
