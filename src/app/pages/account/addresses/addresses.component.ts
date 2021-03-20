import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  billingForm: FormGroup;
  shippingForm: FormGroup;
  countries = [];
  user:User;
  constructor(private authserv:AuthService,public appService:AppService, public formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user= JSON.parse (localStorage.getItem('user'))
    this.countries = this.appService.getCountries();
    this.billingForm = this.formBuilder.group({
      'firstName': [this.user.firstName, Validators.required],
      'lastName': [this.user.lastName, Validators.required],
      'middleName': this.user.middleName,
      'company': this.user.compagny,
      'email': [localStorage.getItem('userconnected'), Validators.compose([Validators.required, emailValidator  ])],
      'phone': [this.user.phone, [Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
      'country': [this.user.country, Validators.required],
      'city': [this.user.city, Validators.required],
      'state': this.user.state,
      'zip': [this.user.zip, Validators.required],
      'address': [this.user.address, Validators.required]
    });
    this.shippingForm = this.formBuilder.group({
      'firstName': [this.user.firstName, Validators.required],
      'lastName': [this.user.lastName, Validators.required],
      'middleName': this.user.middleName,
      'company': this.user.compagny,
      'email': [localStorage.getItem('userconnected'), Validators.required],
      'phone': [this.user.phone, Validators.required],
      'country': [this.user.country, Validators.required],
      'city': [this.user.city, Validators.required],
      'state': this.user.state,
      'zip': [this.user.zip, Validators.required],
      'address': [this.user.address, Validators.required]
    });
  }

  public onBillingFormSubmit(values:Object):void {
    console.log(this.billingForm);
    
    if (this.billingForm.valid) {
      this.authserv.updateUser(this.billingForm.value).subscribe(res=>{});

      this.snackBar.open('Your billing address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onShippingFormSubmit(values:Object):void {
    if (this.shippingForm.valid) {
      this.snackBar.open('Your shipping address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  // public SuitUser(){
  //   this.authserv.updateUser(this.billingForm.value).subscribe(res=>{console.log(res);
  //   })
  // }
}
