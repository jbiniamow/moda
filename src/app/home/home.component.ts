import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../Services/clothing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  combinations = [
    {top: '../../assets/clothing/Tops/t-shirt.png', bottom: '../../assets/clothing/Bottoms/pants.png', outerwear: '../../assets/clothing/Outerwear/hoodie.png', footwear:'../../assets/clothing/Footwear/low-top-canvas-sneakers.png'},
    {top: '../../assets/clothing/Tops/collared-tshirt.png', bottom: '../../assets/clothing/Bottoms/pants.png', outerwear: '../../assets/clothing/Outerwear/pea-coat.png', footwear:'../../assets/clothing/Footwear/oxford-shoes.png'},
    {top: '../../assets/clothing/Tops/sweater.png', bottom: '../../assets/clothing/Bottoms/jeans.png', outerwear: '../../assets/clothing/Outerwear/bomber-jacket.png', footwear:'../../assets/clothing/Footwear/combat-boots.png'},
    {top: '../../assets/clothing/Tops/tank-top.png', bottom: '../../assets/clothing/Bottoms/shorts.png', outerwear: '../../assets/clothing/Outerwear/track-jacket.png', footwear:'../../assets/clothing/Footwear/flip-flops.png'},
  ]

  constructor(private clothingService: ClothingService) {}

  ngOnInit(): void {
  }

}
