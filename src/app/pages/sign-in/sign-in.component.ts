import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/services/auth.service';
import {HttpClient} from '@angular/common/http'
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user: User;
  signin:boolean;
  isLoginSubject
  isLoggedIn : Observable<boolean>
  constructor(public formBuilder: FormBuilder,private authService: AuthService, public router:Router, public snackBar: MatSnackBar, private us:AuthService) { 
 
  }

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
     console.log(res);
     
      this.user = res.user;
      if (!this.user) {
        this.snackBar.open('user not found','×',{panelClass: 'success', verticalPosition: 'top', duration: 3000})
        
      }
      else{
       localStorage.setItem("token", res.token);
       localStorage.setItem("userconnected",res.user);
       localStorage.setItem("userId",res.userId)
       localStorage.setItem("user",JSON.stringify(res.user))

       this.us.isLoginSubject.next(true);
       if(this.user.email=="sofien@gmail.com" || this.user.email=="nasserimen@gmail.com" || this.user.email=="js.wafa@gmail.com"){
        localStorage.setItem("token", res.token);
        localStorage.setItem("userconnected",res.user);
        localStorage.setItem("userId",res.userId)
        localStorage.setItem("userName",res.userName) 
        localStorage.setItem("user",JSON.stringify(res.user))

        this.router.navigate(['/admin/dashboard'])
        
          // const userId=localStorage.getItem('userId')
          // this.authService.getUser(userId).subscribe(res=>{console.log(res);
          // })
      
       }else{
        localStorage.setItem("token", res.token);
        localStorage.setItem("userconnected",this.loginForm.value.email);
        localStorage.setItem("userId",res.userId)
        localStorage.setItem("userName",res.userName)
       this.router.navigate(['/']);
      }
     }
   },
  err=>{},
  ()=>{
  
    
    
    // this.us.isLoginSubject.next(true)    
  },
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
