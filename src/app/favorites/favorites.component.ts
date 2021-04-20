import { Component, OnInit } from '@angular/core';
import { 
  MatSnackBar, 
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition 
} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ClothingService } from '../Services/clothing.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoritesSubscription: Subscription;
  favorites: any[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(public clothingService: ClothingService, private _snackbar: MatSnackBar) { 
    this.favoritesSubscription = new Subscription;
  }

  public ngOnInit(): void {
    this.favoritesSubscription = this.clothingService.getFavorites().subscribe(data => {
      this.favorites = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    });
  }

  ngOnDestroy() {
    this.favoritesSubscription.unsubscribe();
  }
  openSnackBar(message: string) {
    this._snackbar.open(message, 'Dismiss', {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  deleteFavorite = (favorite: any) => {
    this.clothingService.deleteFavorite(favorite);
    this.openSnackBar('🗑 Outfit deleted!');
  }

  checkInfo() {
    console.log(this.favorites);
  }


}
