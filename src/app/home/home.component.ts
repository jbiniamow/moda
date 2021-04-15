import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Clothing } from '../interfaces/clothing.model';
import { ClothingService } from '../Services/clothing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // combinations = [
    // {top: '../../assets/clothing/Tops/t-shirt.png', bottom: '../../assets/clothing/Bottoms/pants.png', outerwear: '../../assets/clothing/Outerwear/hoodie.png', footwear:'../../assets/clothing/Footwear/low-top-canvas-sneakers.png'},
    // {top: '../../assets/clothing/Tops/collared-tshirt.png', bottom: '../../assets/clothing/Bottoms/pants.png', outerwear: '../../assets/clothing/Outerwear/pea-coat.png', footwear:'../../assets/clothing/Footwear/oxford-shoes.png'},
    // {top: '../../assets/clothing/Tops/sweater.png', bottom: '../../assets/clothing/Bottoms/jeans.png', outerwear: '../../assets/clothing/Outerwear/bomber-jacket.png', footwear:'../../assets/clothing/Footwear/combat-boots.png'},
    // {top: '../../assets/clothing/Tops/tank-top.png', bottom: '../../assets/clothing/Bottoms/shorts.png', outerwear: '../../assets/clothing/Outerwear/track-jacket.png', footwear:'../../assets/clothing/Footwear/flip-flops.png'},
  // ];
  combinations: any[] = [];
  closet: Clothing[];
  clothingSubscription: Subscription;
  tops: Clothing[];
  bottoms: Clothing[];
  outerwear: Clothing[];
  footwear: Clothing[];

  constructor(private clothingService: ClothingService) {
    this.clothingSubscription = new Subscription;
    this.closet = [];
    this.tops = [];
    this.bottoms = [];
    this.outerwear = [];
    this.footwear = [];
    this.combinations = [];
  }

  ngOnInit(): void {
    this.clothingSubscription = this.clothingService.getClothing().subscribe(data => {
      this.closet = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Clothing
        }
      })
      this.filterTops(this.closet);
      this.filterBottoms(this.closet);
      this.filterOuterwear(this.closet);
      this.filterFootwear(this.closet);
      this.combineClothing();
    });
  }

  ngOnDestroy() {
    this.clothingSubscription.unsubscribe();
  }

  filterTops(closet:any): any[] {
    return this.tops = closet.filter((i: any) => i.category === 'tops');
  }

  filterBottoms(closet:any): any[] {
    return this.bottoms = closet.filter((i: any) => i.category === 'bottoms');
  }

  filterOuterwear(closet:any): any[] {
    return this.outerwear = closet.filter((i: any) => i.category === 'outerwear');
  }

  filterFootwear(closet:any): any[] {
    return this.footwear = closet.filter((i: any) => i.category === 'footwear');
  }

  combineClothing() {
    this.combinations = [];
    this.tops.forEach(top => this.bottoms.forEach(bottom => this.outerwear.forEach(outerwear => this.footwear.forEach(footwear => this.combinations.push([top, bottom, outerwear, footwear])))));
    for(let i = this.combinations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.combinations[i], this.combinations[j]] = [this.combinations[j], this.combinations[i]];
    }
    // this.combinations.forEach(combination => console.log(JSON.stringify(combination, null)));
  }

  favoriteOutfit = (outfit: any) => {
    this.clothingService.favoriteClothing(outfit);
    // console.log(outfit);
  }

  closetF() {
    console.log(this.combinations);
    // console.log("Tops: " + this.tops);
    // console.log("Bottoms: " + this.bottoms);
    // console.log("Outerwear: " + this.outerwear);
    // console.log("Footwear: " + this.footwear);
  }
}
