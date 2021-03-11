import { Component, OnInit } from '@angular/core';
import { count } from 'console';
import { environment } from 'src/environments/environment';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  baseUrl=environment.baseURL;
  constructor(public appService:AppService) { }

  ngOnInit() {
    this.appService.Data.cartList.forEach(product=>{
      this.total[product.titre] = product.cardCount*product.prix;
      this.grandTotal += product.cardCount*product.prix;
      this.cartItemCount[product.titre] = product.cardCount;
      this.cartItemCountTotal += product.cardCount;
    })
  }

  public updateCart(value){
   
    
    if(value){
   
      this.total[value.productTitre] = value.total;
      this.cartItemCount[value.productTitre] = value.soldQuantity;
      this.grandTotal=0
      this.appService.Data.cartList.forEach(product => {
        
        this.grandTotal+=this.total[product.titre];
        
      });

      // this.appService.Data.cartList.forEach(product=>{
      // //  this.total[product.titre] = product.cardCount*product.prix;
      
      //   this.grandTotal += x*product.prix;
      //   // this.cartItemCount[product.titre] = product.cardCount;
      //   // this.cartItemCountTotal += product.cardCount;
      // })
      // this.total.forEach(price=>{
      //   this.grandTotal += price;
      // });
      // this.cartItemCountTotal = 0;
      // this.cartItemCount.forEach(count=>{
      //   this.cartItemCountTotal +=count;
      // });
     
      // this.appService.Data.totalPrice = this.grandTotal;
      // this.appService.Data.totalCartCount = this.cartItemCountTotal;
      //  console.log(this.appService.Data.cartList);
       
      //  console.log(this.cartItemCount);
        

      // this.appService.Data.cartList.forEach(product=>{
        
      //   this.cartItemCount.forEach((count,index)=>{
      //     console.log(count.ti);
      //     if(count.titre == product.titre){
        
            
      //       product.cardCount = count;
      //     }

      //   });

      // });
      
      
    }
  }

  public remove(product) {
    const index: number = this.appService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.appService.Data.cartList.splice(index, 1);
      this.grandTotal = this.grandTotal - this.total[product.titre]; 
      this.appService.Data.totalPrice = this.grandTotal;       
      this.total.forEach(val => {
        if(val == this.total[product.titre]){
          this.total[product.titre] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.titre]; 
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product.titre]){
          this.cartItemCount[product.titre] = 0;
        }
      });
      this.appService.resetProductCartCount(product);
    }     
  }

  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  } 

}
