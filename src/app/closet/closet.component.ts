import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../Services/clothing.service';
import { Clothing } from '../interfaces/clothing.model';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss'],
})
export class ClosetComponent implements OnInit {
  breakpoint: number;
  closet: Clothing[];
  clothing: Clothing;
  
   constructor(public clothingService: ClothingService) { 
    this.breakpoint = 0;
    this.closet = [];
    this.clothing = { category: '', type: '', color: '' };
  }

  public ngOnInit(): void {
    this.initialGridSize();
    this.clothingService.getClothing().subscribe(data => {
      this.closet = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Clothing
        }
      })
    });
  }

  addClothing = () => {
    this.clothing = { category: 'tops', type: 't-shirt', color: 'green'};
    this.clothingService.createClothing(this.clothing);
  }

  FabOptions = {
    buttons: [
      {
        icon: '/assets/shoe.svg',
        name: 'Footwear'
      },
      {
        icon: '/assets/jacket.svg',
        name: 'Jacket'
      },
      {
        icon: '/assets/pants.svg',
        name: 'Bottoms'
      },
      {
        icon: '/assets/tshirt.svg',
        name: 'Tops',
        action: this.addClothing
      }
    ]
  };

  // addClothing() {
  //   this.clothing = { category: 'tops', type: 't-shirt', color: 'green'};
  //   this.clothingService.createClothing(this.clothing);
  // }

  

  initialGridSize() {
    if (window.innerWidth <= 1000) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 1200) {
      this.breakpoint = 2;
    } else if (window.innerWidth <= 1400) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

  onResize(event: any) {
    if (event.target.innerWidth <= 1000) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth <= 1200) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 1440) {
      this.breakpoint = 3;
    } else {
      this.breakpoint = 4;
    }
  }

}
