import { Component, Inject, OnInit } from '@angular/core';
import { ClothingService } from '../Services/clothing.service';
import { Clothing } from '../interfaces/clothing.model';
import { Subscription } from 'rxjs';
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition 
} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  category: string;
  type: string;
  color: string;
}

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss'],
})
export class ClosetComponent implements OnInit {
  breakpoint: number;
  closet: Clothing[];
  clothing: Clothing;
  clothingSubscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  category: string;
  type: string;
  color: string;
  
   constructor(public clothingService: ClothingService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 
     this.clothingSubscription = new Subscription;
    this.breakpoint = 0;
    this.closet = [];
    this.clothing = { category: '', type: '', color: '' };
    this.category = '';
    this.type = '';
    this.color = '';
  }

  public ngOnInit(): void {
    this.initialGridSize();
    this.clothingSubscription = this.clothingService.getClothing().subscribe(data => {
      this.closet = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Clothing
        }
      })
    });
  }

  ngOnDestroy() {
    this.clothingSubscription.unsubscribe();
  }

  openClosetDialog = (category: any) => {
    const dialogRef = this.dialog.open(ClosetAddDialog, {
      width: '100%',
      data: {category: category, type: this.type, color: this.color}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.type = result.type;
      this.color = result.color;
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  deleteClothing = (top: any) => {
    this.clothingService.deleteClothing(top);
    this.openSnackBar(top.type + ' deleted!');
  }

  filterTops(closet:any): any[] {
    return closet.filter((i: any) => i.category === 'tops');
  }

  filterBottoms(closet:any): any[] {
    return closet.filter((i: any) => i.category === 'bottoms');
  }

  addClothing = () => {
    // this.clothing = { category: 'tops', type: 't-shirt', color: '#D8CE40'};
    // this.openSnackBar(this.clothing.type + ' added!');
    // this.clothingService.createClothing(this.clothing);
    console.log("add clothes");
  }

  FabOptions = {
    buttons: [
      {
        icon: '/assets/shoe.svg',
        name: 'Footwear',
        action: this.openClosetDialog
      },
      {
        icon: '/assets/jacket.svg',
        name: 'Outerwear',
        action: this.openClosetDialog
      },
      {
        icon: '/assets/pants.svg',
        name: 'Bottoms',
        action: this.openClosetDialog
      },
      {
        icon: '/assets/tshirt.svg',
        name: 'Tops',
        action: this.openClosetDialog
      }
    ]
  };

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

@Component({
  selector: 'closet-add-dialog',
  templateUrl: 'closet-add-dialog.html',
  styleUrls: ['./closet.component.scss'],
})
export class ClosetAddDialog{
  selectedItem = 'baseball-tshirt';
  chosenColor: string;
  topImages = 
  [
    {path: '../../assets/clothing/Tops/baseball-tshirt.png', displayName: 'Baseball Tee', fileName: 'baseball-tshirt'},
    {path: '../../assets/clothing/Tops/button-up.png', displayName: 'Button-up Shirt', fileName: 'button-up'},
    {path: '../../assets/clothing/Tops/collared-tshirt.png', displayName: 'Collard Tee', fileName: 'collared-tshirt'},
    {path: '../../assets/clothing/Tops/graphic-tshirt.png', displayName: 'Graphic Tee', fileName: 'graphic-tshirt'},
    {path: '../../assets/clothing/Tops/long-sleeve-polo.png', displayName: 'Long Sleeve Polo', fileName: 'long-sleeve-polo'},
    {path: '../../assets/clothing/Tops/long-sleeve-tshirt.png', displayName: 'Long Sleeve Tee', fileName: 'long-sleeve-tshirt'},
    {path: '../../assets/clothing/Tops/patterned-shirt.png', displayName: 'Patterned Shirt', fileName: 'patterned-shirt'},
    {path: '../../assets/clothing/Tops/polo.png', displayName: 'Polo', fileName: 'polo'},
    {path: '../../assets/clothing/Tops/sweater.png', displayName: 'Sweater', fileName: 'sweater'},
    {path: '../../assets/clothing/Tops/t-shirt.png', displayName: 'Tee', fileName: 't-shirt'},
    {path: '../../assets/clothing/Tops/tank-top.png', displayName: 'Tank Top', fileName: 'tank-top'},
  ];

  bottomImages = [
    {path: '../../assets/clothing/Bottoms/cargo-pants.png', displayName: 'Cargo Pants', fileName: 'cargo-pants'},
    {path: '../../assets/clothing/Bottoms/jeans.png', displayName: 'Jeans', fileName: 'jeans'},
    {path: '../../assets/clothing/Bottoms/joggers.png', displayName: 'Joggers', fileName: 'joggers'},
    {path: '../../assets/clothing/Bottoms/pants.png', displayName: 'Pants', fileName: 'pants'},
    {path: '../../assets/clothing/Bottoms/shorts.png', displayName: 'Shorts', fileName: 'shorts'},
    {path: '../../assets/clothing/Bottoms/track-shorts.png', displayName: 'Track Shorts', fileName: 'track-shorts'},
  ];

  outerwearImages = [
    {path: '../../assets/clothing/Outerwear/bomber-jacket.png', displayName: 'Bomber Jacket', fileName: 'bomber-jacket'},
    {path: '../../assets/clothing/Outerwear/denim-jacket.png', displayName: 'Denim Jacket', fileName: 'denim-jacket'},
    {path: '../../assets/clothing/Outerwear/harrington-jacket.png', displayName: 'Harrington Jacket', fileName: 'harrington-jacket'},
    {path: '../../assets/clothing/Outerwear/hoodie.png', displayName: 'Hoodie', fileName: 'hoodie'},
    {path: '../../assets/clothing/Outerwear/leather-jacket.png', displayName: 'Leather Jacket', fileName: 'leather-jacket'},
    {path: '../../assets/clothing/Outerwear/parka.png', displayName: 'Parka', fileName: 'parka'},
    {path: '../../assets/clothing/Outerwear/pea-coat.png', displayName: 'Pea Coat', fileName: 'pea-coat'},
    {path: '../../assets/clothing/Outerwear/rain-jacket.png', displayName: 'Rain Jacket', fileName: 'rain-jacket'},
    {path: '../../assets/clothing/Outerwear/track-jacket.png', displayName: 'Track Jacket', fileName: 'track-jacket'},
    {path: '../../assets/clothing/Outerwear/trench-coat.png', displayName: 'Trench', fileName: 'trench-coat'},
    {path: '../../assets/clothing/Outerwear/varsity-jacket.png', displayName: 'Varsity Jacket', fileName: 'varsity-jacket'},
  ];

  footwearImages = [
    {path: '../../assets/clothing/Footwear/combat-boots.png', displayName: 'Combat Boots', fileName: 'combat-boots'},
    {path: '../../assets/clothing/Footwear/cowboy-boots.png', displayName: 'Cowboy Boots', fileName: 'cowboy-boots'},
    {path: '../../assets/clothing/Footwear/flip-flops.png', displayName: 'Flip Flops', fileName: 'flip-flops'},
    {path: '../../assets/clothing/Footwear/low-top-canvas-sneakers.png', displayName: 'Low Top Canvas Sneakers', fileName: 'low-top-canvas-sneakers'},
    {path: '../../assets/clothing/Footwear/oxford-shoes.png', displayName: 'Oxford Shoes', fileName: 'oxford-shoes'},
    {path: '../../assets/clothing/Footwear/slippers.png', displayName: 'Slippers', fileName: 'slippers'},
  ];

  constructor(
    public dialogRef: MatDialogRef<ClosetAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.chosenColor = '';
    }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
