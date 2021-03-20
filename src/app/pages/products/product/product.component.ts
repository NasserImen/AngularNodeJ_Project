import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { Livre } from 'src/app/back-office/admin/Models/LivreModel';
import { environment } from 'src/environments/environment';
import { AddBooksService } from 'src/app/back-office/admin/add-books.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: any;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Livre>;
  bookId: string
  productId: string
  stock:number
  availibility="Available"
  constructor(public livreService:AddBooksService,public appService:AppService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public formBuilder: FormBuilder ) {  }
result : any
books =[]
baseUrl=environment.baseURL;
book:Livre;
Book:Livre
  ngOnInit() {    
   this.productId= this.activatedRoute.snapshot.paramMap.get("_id")

   this.getProductById(this.productId)
  // this.livreService.getLivre(this.productId).subscribe(res=>{this.book=res},err=>{},()=>{this.Book=this.book})
    
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    this.getRelatedProducts();    
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,      
      keyboard: true,
      navigation: true,
      pagination: false,       
      loop: false, 
      preloadImages: false,
      lazy: true, 
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProductById(id){  
    this.appService.getProductById(id).subscribe(data=>{
      this.product = data;
      this.stock = this.product.found.stock
      if(this.stock!==null){
      this.availibility="Available"
    }else{
      this.availibility=" Unavailable"
    }

    },err=>{
      console.log(err);
      
    }, ()=>{    
    });

  }

  public getRelatedProducts(){
    this.appService.getProducts().subscribe(data => {
      this.relatedProducts = data;
    })
  }

  public selectImage(image){
    this.image = image.medium;
    this.zoomImage = image.big;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // } 

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }
}