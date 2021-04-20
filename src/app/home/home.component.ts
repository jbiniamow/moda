import { Component, OnInit } from '@angular/core';
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition 
} from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clothing } from '../interfaces/clothing.model';
import { ClothingService } from '../Services/clothing.service';
import { FilterService } from '../Services/filter.service';
import { filter } from 'rxjs/operators';


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
  favorites: any[] = [];
  favoritedOutfits: any[] = [];
  filterColors: any[] = [];
  filterClothing: any[] = [];
  closet: Clothing[];
  clothingSubscription: Subscription;
  favoritesSubscription: Subscription;
  tops: Clothing[];
  bottoms: Clothing[];
  outerwear: Clothing[];
  footwear: Clothing[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  searchText: string;

  constructor(private clothingService: ClothingService, private _snackbar: MatSnackBar, public filterService: FilterService, private router: Router) {
    this.clothingSubscription = new Subscription;
    this.favoritesSubscription = new Subscription;
    this.closet = [];
    this.tops = [];
    this.bottoms = [];
    this.outerwear = [];
    this.footwear = [];
    this.combinations = [];
    this.searchText = '';
  }

  ngOnInit(): void {
    this.favoritesSubscription = this.clothingService.getFavorites().subscribe(data => {
      this.favorites = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    });
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
    this.filterService.selectedColors.subscribe((input) => {
      this.filterColors = input;
    })
    this.filterService.selectedClothing.subscribe((input) => {
      this.filterClothing = input;
    })
  }

  ngOnDestroy() {
    this.clothingSubscription.unsubscribe();
    this.favoritesSubscription.unsubscribe();
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, 'Dismiss', {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
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

  filterOutfits(closet: any): any[] {
    if (this.filterColors.length === 0 && this.filterClothing.length === 0) {
      return closet;
    }
    return this.combinations.filter((el: any) => el.some((e: any) => this.filterColors.some((f: any) => e.colorName === f.colorName) || this.filterClothing.some((g: any) => e.displayName === g.displayName)));
  }

  public get searchTextValue(): string {
    this.searchText = this.filterService.input;
    return this.filterService.input;
  }

  combineClothing() {
    this.combinations = [];
    this.favoritedOutfits = [];
    this.tops.forEach(top => this.bottoms.forEach(bottom => this.outerwear.forEach(outerwear => this.footwear.forEach(footwear => this.combinations.push([top, bottom, outerwear, footwear])))));
    for(let i = this.combinations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.combinations[i], this.combinations[j]] = [this.combinations[j], this.combinations[i]];
    }
    // for(let i = 0; i < this.favorites.length; i++) {
    //   this.favoritedOutfits.push(this.favorites[i].favoritedOutfit);
    // }
    // this.combinations.filter(array => this.favoritedOutfits.some(filter => filter.category === array.category && filter))
    // this.combinations.forEach(combination => console.log(JSON.stringify(combination, null)));
  }

  favoriteOutfit = (outfit: any) => {
    this.clothingService.favoriteClothing(outfit);
    this.openSnackBar('♥ Outfit favorited!')
    // console.log(outfit);
  }

  closetF() {
    console.log(this.combinations);
    console.log(this.favoritedOutfits);
    // console.log("Tops: " + this.tops);
    // console.log("Bottoms: " + this.bottoms);
    // console.log("Outerwear: " + this.outerwear);
    // console.log("Footwear: " + this.footwear);
  }
}
