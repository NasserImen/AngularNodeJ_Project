import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { Livre } from 'src/app/back-office/admin/Models/LivreModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/book1.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/book2.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/book3.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/book4.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/book5.jfif' }
  ];

  public brands = [];
  public banners = [];
  public featuredProducts: Array<Livre>;
  public onSaleProducts: Array<Livre>;
  public topRatedProducts: Array<Livre>;
  public newArrivalsProducts: Array<Livre>;


  constructor(public appService:AppService) { }

  ngOnInit() {
    // this.getBanners();
    this.getProducts();
    // this.getBrands();
  }

  public onLinkClick(e){
    this.getProducts(); 
  }

  public getProducts(){
    // if(type == "featured" && !this.featuredProducts){
    //   this.appService.getProducts("featured").subscribe(data=>{
    //     this.featuredProducts = data;      
    //   }) 
    // }
    // if(type == "on sale" && !this.onSaleProducts){
    //   this.appService.getProducts("on-sale").subscribe(data=>{
    //     this.onSaleProducts = data;      
    //   })
    // }
    // if(type == "top rated" && !this.topRatedProducts){
    //   this.appService.getProducts("top-rated").subscribe(data=>{
    //     this.topRatedProducts = data;      
    //   })
    // }
    // if(type == "new arrivals" && !this.newArrivalsProducts){
    //   this.appService.getProducts("new-arrivals").subscribe(data=>{
    //     this.newArrivalsProducts = data;      
    //   })
    // }
   
  }

  // public getBanners(){
  //   this.appService.getBanners().subscribe(data=>{
  //     this.banners = data;
  //   })
  // }

  // public getBrands(){
  //   this.brands = this.appService.getBrands();
  // }

}
