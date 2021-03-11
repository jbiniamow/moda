import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  combinations = [
    {top: '../../assets/clothing/Tops/t-shirt.png', bottom: '../../assets/clothing/Bottoms/pants.png', outerwear: '../../assets/clothing/Outerwear/hoodie.png', footwear:'../../assets/clothing/Footwear/low-top-canvas-sneakers.png'},
  ]
}
