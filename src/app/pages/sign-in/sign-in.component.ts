import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/services/auth.service';
import {HttpClient} from '@angular/common/http'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user: User;
  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar, private us:AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email:new FormControl ('', Validators.compose([Validators.required, emailValidator  ])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6) ])) 
    });

    this.registerForm = new FormGroup ({
      name: new FormControl ('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl ('', Validators.compose([Validators.required, emailValidator ])),
      password: new FormControl ('', Validators.required),
      confirmPassword: new FormControl ('', Validators.required)
    })

  }

  public onLoginFormSubmit(user):void {
   this.us.login(user).subscribe(res=>{
      this.user = res.user;
      console.log(res);
      
      if (!this.user) {
        this.snackBar.open('user not found','×',{panelClass: 'success', verticalPosition: 'top', duration: 3000})
      }
      else{
       localStorage.setItem("token", JSON.stringify(res.token))
       this.router.navigate(['/']);
     }
   },
  err=>{},
  ()=>{},
  )};

  public onRegisterFormSubmit(user):void {    
 
    this.us.postusers(user).subscribe(res =>{
      console.log(res);
      if(this.registerForm.value.password==this.registerForm.value.confirmPassword){
      if (res=='user already exist'){
        this.snackBar.open('user already exist','×',{panelClass: 'success', verticalPosition: 'top', duration: 3000})
      }
      else{
        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.registerForm.reset()
    }
  }
  else{
    this.snackBar.open('confirm your password','×',{panelClass: 'success', verticalPosition: 'top', duration: 3000}) 
  }
    } , err=>{},()=>{})
    console.log(user);  
  }
}
