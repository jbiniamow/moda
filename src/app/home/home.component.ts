import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
