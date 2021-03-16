import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { Livre } from 'src/app/back-office/admin/Models/LivreModel';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public quantity:number = 1;
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appService.Data.cartList.forEach(cartProduct=>{
      this.appService.Data.wishList.forEach(product=>{
        if(cartProduct.titre == product.titre){
          product.cardCount = cartProduct.cardCount;
        }
      });
    });
  }

  public remove(product:Livre) {
    const index: number = this.appService.Data.wishList.indexOf(product);
    if (index !== -1) {
        this.appService.Data.wishList.splice(index, 1);
    }     
  }

  public clear(){
    this.appService.Data.wishList.length = 0;
  } 

  public getQuantity(val){
    this.quantity = val.soldQuantity;
  }

  public addToCart(product:Livre){
    let currentProduct = this.appService.Data.cartList.filter(item=>item.titre == product.titre)[0];
    if(currentProduct){
      if((currentProduct.cardCount + this.quantity) <= product.stock){
        product.cardCount = currentProduct.cardCount + this.quantity;
      }
      else{
        this.snackBar.open('You can not add more items than available. In stock ' + product.stock + ' items and you already added ' + currentProduct.cardCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cardCount = this.quantity;
    }
    this.appService.addToCart(product);
  } 

}