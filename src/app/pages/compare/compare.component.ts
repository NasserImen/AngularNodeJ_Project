import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { Livre } from 'src/app/back-office/admin/Models/LivreModel';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit() { 
    this.appService.Data.cartList.forEach(cartProduct=>{
      this.appService.Data.compareList.forEach(product=>{
        if(cartProduct.titre == product.titre){
          product.cardCount = cartProduct.cardCount;
        }
      });
    });
  }

  public remove(product:Livre) {
      const index: number = this.appService.Data.compareList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.compareList.splice(index, 1);
      }        
  }

  public clear(){
    this.appService.Data.compareList.length = 0;
  }

  public addToCart(product:Livre){
    product.cardCount = product.cardCount + 1;
    if(product.cardCount <= product.stock){
      this.appService.addToCart(product);
    }
    else{
      product.cardCount = product.stock;
      this.snackBar.open('You can not add more items than available. In stock ' + product.stock + ' items and you already added ' + product.cardCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }

}
