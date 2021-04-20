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
  tops = 
  [
    {path: '../../assets/clothing/Tops/baseball-tshirt.png', displayName: 'Baseball Tee', fileName: 'baseball-tshirt', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/button-up.png', displayName: 'Button-up Shirt', fileName: 'button-up', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/collared-tshirt.png', displayName: 'Collard Tee', fileName: 'collared-tshirt', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/graphic-tshirt.png', displayName: 'Graphic Tee', fileName: 'graphic-tshirt', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/long-sleeve-polo.png', displayName: 'Long Sleeve Polo', fileName: 'long-sleeve-polo', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/long-sleeve-tshirt.png', displayName: 'Long Sleeve Tee', fileName: 'long-sleeve-tshirt', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/patterned-shirt.png', displayName: 'Patterned Shirt', fileName: 'patterned-shirt', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/polo.png', displayName: 'Polo', fileName: 'polo', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/sweater.png', displayName: 'Sweater', fileName: 'sweater', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/t-shirt.png', displayName: 'Tee', fileName: 't-shirt', category: 'tops', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Tops/tank-top.png', displayName: 'Tank Top', fileName: 'tank-top', category: 'tops', colorHex: '', colorName: ''},
  ];

  bottoms = [
    {path: '../../assets/clothing/Bottoms/cargo-pants.png', displayName: 'Cargo Pants', fileName: 'cargo-pants', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/jeans.png', displayName: 'Jeans', fileName: 'jeans', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/joggers.png', displayName: 'Joggers', fileName: 'joggers', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/pants.png', displayName: 'Pants', fileName: 'pants', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/shorts.png', displayName: 'Shorts', fileName: 'shorts', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/track-shorts.png', displayName: 'Track Shorts', fileName: 'track-shorts', category: 'bottoms', colorHex: '', colorName: ''},
  ];

  outerwear = [
    {path: '../../assets/clothing/Outerwear/bomber-jacket.png', displayName: 'Bomber Jacket', fileName: 'bomber-jacket', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/denim-jacket.png', displayName: 'Denim Jacket', fileName: 'denim-jacket', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/harrington-jacket.png', displayName: 'Harrington Jacket', fileName: 'harrington-jacket', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/hoodie.png', displayName: 'Hoodie', fileName: 'hoodie', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/leather-jacket.png', displayName: 'Leather Jacket', fileName: 'leather-jacket', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/parka.png', displayName: 'Parka', fileName: 'parka', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/pea-coat.png', displayName: 'Pea Coat', fileName: 'pea-coat', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/rain-jacket.png', displayName: 'Rain Jacket', fileName: 'rain-jacket', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/track-jacket.png', displayName: 'Track Jacket', fileName: 'track-jacket', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/trench-coat.png', displayName: 'Trench Coat', fileName: 'trench-coat', category: 'outerwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Outerwear/varsity-jacket.png', displayName: 'Varsity Jacket', fileName: 'varsity-jacket', category: 'outerwear', colorHex: '', colorName: ''},
  ];

  footwear = [
    {path: '../../assets/clothing/Footwear/combat-boots.png', displayName: 'Combat Boots', fileName: 'combat-boots', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/cowboy-boots.png', displayName: 'Cowboy Boots', fileName: 'cowboy-boots', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/flip-flops.png', displayName: 'Flip Flops', fileName: 'flip-flops', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/low-top-canvas-sneakers.png', displayName: 'Low Top Canvas Sneakers', fileName: 'low-top-canvas-sneakers', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/oxford-shoes.png', displayName: 'Oxford Shoes', fileName: 'oxford-shoes', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/slippers.png', displayName: 'Slippers', fileName: 'slippers', category: 'footwear', colorHex: '', colorName: ''},
  ];
  selectedColors: any[] = [];
  selectedClothing: any[] = [];
  selectedTops: any[] = [];


  constructor(public router: Router, private filterService: FilterService){
    
  }

  isSelected(color: any): boolean {
    const index = this.selectedColors.indexOf(color);
    return index >= 0;
  }

  isSelectedClothing(clothing: any): boolean {
    const index = this.selectedClothing.indexOf(clothing);
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

  toggleClothing(clothing: any): void {
    let index = this.selectedClothing.indexOf(clothing);
    if (index >= 0) {
      this.selectedClothing.splice(index, 1);
    } else {
      this.selectedClothing.push(clothing);
    }
    this.filterService.emitSelectChangesClothing(this.selectedClothing);
    console.log(this.selectedClothing);
  }
}
