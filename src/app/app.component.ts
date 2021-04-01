import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from './Services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MODA';
  selectable: boolean = true;
  colors = [
    {colorName: 'Navy', hex: '#000080'},
    {colorName: 'Burgundy', hex: '#800020'},
    {colorName: 'Green', hex: '#4B5320'},
    {colorName: 'Red', hex: '#F9313C'},
    {colorName: 'Gray', hex: '#808080'},
    {colorName: 'Brown', hex: '#654321'},
    {colorName: 'Soft Pink', hex: '#FFB6C1'},
    {colorName: 'Orange', hex: '#FE9F42'},
    {colorName: 'Beige', hex: '#F5F5DC'},
    {colorName: 'Yellow', hex: '#F6E255'},
    {colorName: 'Light Blue', hex: '#ADD8E6'},
    {colorName: 'Black', hex: '#1d1d1d'},
    {colorName: 'White', hex: '#FFFFFF'},
  ];
  selectedColors: any[] = [];

  constructor(public router: Router, private filterService: FilterService){
    
  }

  isSelected(color: any): boolean {
    const index = this.selectedColors.indexOf(color);
    return index >= 0;
  }

  toggleColor(color: any): void {
    let index = this.selectedColors.indexOf(color);
    if (index >= 0) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    this.filterService.emitSelectChanges(this.selectedColors);
  }
}
