import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  selected:string;

  constructor() { 
    this.selected = "";
  }

  ngOnInit(): void {
  }

  setSelected(select:string) {
    this.selected = select;
  }
}
