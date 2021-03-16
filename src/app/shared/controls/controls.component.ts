import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { Livre } from 'src/app/back-office/admin/Models/LivreModel';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: Livre;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();
  public count:number = 1;
  public align = 'center center';
  constructor(public appService:AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.product){
      if(this.product.cardCount > 0){
        this.count = this.product.cardCount;
      }
    }  
    // this.layoutAlign(); 
  }

  // public layoutAlign(){
  //   if(this.type == 'all'){
  //     this.align = 'space-between center';
  //   }
  //   else if(this.type == 'wish'){
  //     this.align = 'start center';
  //   }
  //   else{
  //     this.align = 'center center';
  //   }
  // }



  public increment(count){
    if(this.count < this.product.stock){
      this.count++;
      let obj = {
        productTitre: this.product.titre,
        soldQuantity: this.count,
        total: this.count * this.product.prix
      }
      this.changeQuantity(obj);
    }
    else{
      this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }    
  }

  public decrement(count){
    if(this.count > 1){
      this.count--;
      let obj = {
        productTitre: this.product.titre,
        soldQuantity: this.count,
        total: this.count * this.product.prix
      }
      this.changeQuantity(obj);
    }
  }

  // public addToCompare(product:Livre){
  //   this.appService.addToCompare(product);
  // }

  public addToWishList(product:Livre){
    this.appService.addToWishList(product);
  }

  public addToCart(product:Livre){
    // console.log(product)
    let currentProduct = this.appService.Data.cartList.filter(item=>item.titre == product.titre)[0];
    if(currentProduct){
      if((currentProduct.cardCount + this.count) <= this.product.stock){
        product.cardCount = currentProduct.cardCount + this.count;
      }
      else{
        this.snackBar.open('You can not add more items than available. In stock ' + this.product.stock + ' items and you already added ' + currentProduct.cardCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cardCount = this.count;
    }
    this.appService.addToCart(product);
  }

  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value){
      this.onQuantityChange.emit(value);
  }

}