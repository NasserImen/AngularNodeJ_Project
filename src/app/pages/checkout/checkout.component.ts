import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { environment } from 'src/environments/environment';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  baseUrl=environment.baseURL;

  constructor(public appService:AppService, public formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cardCount*product.prix;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = new FormGroup({
      firstName:new FormControl ('', Validators.required),
      lastName: new FormControl ('', Validators.required),
      middleName: new FormControl (''),
      company: new FormControl (''),
      email: new FormControl('', Validators.compose([Validators.required, emailValidator  ])),
      phone: new FormControl ('', [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]),
      country: new FormControl ('', Validators.required),
      city:  new FormControl ('', Validators.required),
      state: new FormControl (''),
      zip: new FormControl ('', [Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.pattern('[0-9]+')]),
      address: new FormControl ('', Validators.required)
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern('[0-9]+')]],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.pattern('[0-9]+')]]
    });
  }

  public placeOrder(){
    
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.forEach(product=>{
      this.appService.Data.totalCartCount+=product.cardCount
      this.appService.Data.totalPrice = this.grandTotal;
     
       
       
    }) 
    // this.appService.Data.cartList.length = 0;    
 
   
    
    var commande ={
      products : this.appService.Data.cartList,
      total : this.appService.Data.totalPrice,
       DeliveryMethod:this.deliveryForm.controls.deliveryMethod.value.name,
       CardNumber:this.paymentForm.controls.cardNumber.value,
       userId : localStorage.getItem('userId'),
       date:new Date()
       
    }

    this.appService.addOrder(commande).subscribe(()=>{
      this.appService.Data.cartList.forEach(e=>{
        e.cardCount=1
      })
      this.appService.Data.cartList=[]
      this.appService.Data.totalPrice=0
      this.appService.Data.totalCartCount=0;
    })
   
    

  }

}
