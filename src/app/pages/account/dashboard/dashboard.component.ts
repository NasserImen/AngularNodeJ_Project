import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName:string;
  userEmail:any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem("token")!= null){
      this.authService.isLoginSubject.next(true)
     this.userName=localStorage.getItem("userName")
     this.userEmail=localStorage.getItem("userconnected")
    }
  }

}
