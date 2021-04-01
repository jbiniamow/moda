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
import { MatStepper } from '@angular/material/stepper';
import { FilterService } from '../Services/filter.service';

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
  updatedColor: any = {};
  filterColors: any[] = [];
  colors = [
    {displayName: 'Navy', hex: '#000080'},
    {displayName: 'Burgundy', hex: '#800020'},
    {displayName: 'Green', hex: '#4B5320'},
    {displayName: 'Red', hex: '#F9313C'},
    {displayName: 'Gray', hex: '#808080'},
    {displayName: 'Brown', hex: '#654321'},
    {displayName: 'Soft Pink', hex: '#FFB6C1'},
    {displayName: 'Orange', hex: '#FE9F42'},
    {displayName: 'Beige', hex: '#F5F5DC'},
    {displayName: 'Yellow', hex: '#F6E255'},
    {displayName: 'Light Blue', hex: '#ADD8E6'},
    {displayName: 'Black', hex: '#1d1d1d'},
    {displayName: 'White', hex: '#FFFFFF'},
  ];
  
   constructor(public clothingService: ClothingService, private _snackBar: MatSnackBar, public dialog: MatDialog, public filterService: FilterService) { 
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
    this.filterService.selectedColors.subscribe((input) => {
      this.filterColors = input;
    })
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

  updateClothingColor = (clothing: any,chosenColor: any) => {
    this.updatedColor = chosenColor;
    this.clothingService.updateClothing(clothing, chosenColor);
    this.openSnackBar(clothing.colorName + ' ' + clothing.displayName + ' updated!');
    console.log(this.updatedColor);
  }

  deleteClothing = (clothing: any) => {
    this.clothingService.deleteClothing(clothing);
    this.openSnackBar(clothing.colorName + ' ' + clothing.displayName + ' deleted!');
  }

  filterTops(closet:any): any[] {
    if (this.filterColors.length === 0) {
      return closet.filter((i: any) => i.category === 'tops');
    }
    return closet.filter((item:any) => item.category === 'tops' && this.filterColors.some(f => f.colorName == item.colorName));
  }

  filterBottoms(closet:any): any[] {
    if (this.filterColors.length === 0) {
      return closet.filter((i: any) => i.category === 'bottoms');
    }
    return closet.filter((item:any) => item.category === 'bottoms' && this.filterColors.some(f => f.colorName == item.colorName));
  }

  filterOuterwear(closet:any): any[] {
    if (this.filterColors.length === 0) {
      return closet.filter((i: any) => i.category === 'outerwear');
    }
    return closet.filter((item:any) => item.category === 'outerwear' && this.filterColors.some(f => f.colorName == item.colorName));
  }

  filterFootwear(closet:any): any[] {
    if (this.filterColors.length === 0) {
      return closet.filter((i: any) => i.category === 'footwear');
    }
    return closet.filter((item:any) => item.category === 'footwear' && this.filterColors.some(f => f.colorName == item.colorName));
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
  selectedItem: any = {};
  chosenColor: any = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  topImages = 
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

  bottomImages = [
    {path: '../../assets/clothing/Bottoms/cargo-pants.png', displayName: 'Cargo Pants', fileName: 'cargo-pants', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/jeans.png', displayName: 'Jeans', fileName: 'jeans', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/joggers.png', displayName: 'Joggers', fileName: 'joggers', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/pants.png', displayName: 'Pants', fileName: 'pants', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/shorts.png', displayName: 'Shorts', fileName: 'shorts', category: 'bottoms', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Bottoms/track-shorts.png', displayName: 'Track Shorts', fileName: 'track-shorts', category: 'bottoms', colorHex: '', colorName: ''},
  ];

  outerwearImages = [
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

  footwearImages = [
    {path: '../../assets/clothing/Footwear/combat-boots.png', displayName: 'Combat Boots', fileName: 'combat-boots', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/cowboy-boots.png', displayName: 'Cowboy Boots', fileName: 'cowboy-boots', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/flip-flops.png', displayName: 'Flip Flops', fileName: 'flip-flops', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/low-top-canvas-sneakers.png', displayName: 'Low Top Canvas Sneakers', fileName: 'low-top-canvas-sneakers', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/oxford-shoes.png', displayName: 'Oxford Shoes', fileName: 'oxford-shoes', category: 'footwear', colorHex: '', colorName: ''},
    {path: '../../assets/clothing/Footwear/slippers.png', displayName: 'Slippers', fileName: 'slippers', category: 'footwear', colorHex: '', colorName: ''},
  ];
  colors = [
    {displayName: 'Navy', hex: '#000080'},
    {displayName: 'Burgundy', hex: '#800020'},
    {displayName: 'Green', hex: '#4B5320'},
    {displayName: 'Red', hex: '#F9313C'},
    {displayName: 'Gray', hex: '#808080'},
    {displayName: 'Brown', hex: '#654321'},
    {displayName: 'Soft Pink', hex: '#FFB6C1'},
    {displayName: 'Orange', hex: '#FE9F42'},
    {displayName: 'Beige', hex: '#F5F5DC'},
    {displayName: 'Yellow', hex: '#F6E255'},
    {displayName: 'Light Blue', hex: '#ADD8E6'},
    {displayName: 'Black', hex: '#1d1d1d'},
    {displayName: 'White', hex: '#FFFFFF'},
  ];

  constructor(
  public dialogRef: MatDialogRef<ClosetAddDialog>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar, public clothingService: ClothingService) {
  }

  selectItem(clothing: any, stepper: MatStepper) {
    this.chosenColor = {};
    this.selectedItem = clothing;
    stepper.next();
  }

  chooseColor(color: any) {
    this.chosenColor = color;
    this.selectedItem.colorHex = this.chosenColor.hex;
    this.selectedItem.colorName = this.chosenColor.displayName;
    console.log(this.selectedItem);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  addClothing = () => {
    this.openSnackBar(this.selectedItem.displayName + ' added!');
    this.clothingService.createClothing(this.selectedItem);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
