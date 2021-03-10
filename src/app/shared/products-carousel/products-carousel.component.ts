import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Data, AppService } from '../../app.service';
import { Product } from "../../app.models";
import{book} from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livre } from 'src/app/back-office/admin/Models/LivreModel';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {


  baseUrl = environment.baseURL
  result : any

 @Input('books') books : Array<Livre> =[];

  @Input('products') products: Array<Livre> = [];s$
  public config: SwiperConfigInterface = {};
  public settings: Settings;
  constructor(public appSettings:AppSettings, public appService:AppService, public dialog: MatDialog, private router: Router ) { 
    this.settings = this.appSettings.settings;
  }




  ngOnInit() {
   }
  
  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,       
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true,  
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        }
      }
    }
  }




  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
        direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(book => {
      if(book){
        this.router.navigate(['/books', book._id, product.titre]); 
      }
    });
  }


}