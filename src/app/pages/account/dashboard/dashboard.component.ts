import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName:string;
  userEmail:any;
  listCommands:any
  found:any
  Validated=0;
  Processing=0;
  OnHold:number=0;
  constructor(private authService: AuthService,public service: CommandService) { }

  ngOnInit() {
    if (localStorage.getItem("token")!= null){
      this.authService.isLoginSubject.next(true)
     this.userName=localStorage.getItem("userName")
     this.userEmail=localStorage.getItem("userconnected")
     this.getCommands()
  
    }
    
  }
  getCommands(){
    this.service.getAllCommands().subscribe(res=>{
      this.listCommands=res
      
     },
     err =>{console.log(err)},
     ()=>{  this.found=this.listCommands.filter(order=>

      order.userId==localStorage.getItem("userId")
      
      )
      
    this.found.forEach(element => {
      if(element.status=='validée'){
        this.Validated+=1;
      }else if(element.status=='en cours'){
        this.Processing+=1
      }else{(element.status=='On Hold')
        this.OnHold+=1;
      }
      
    });})
    }

}
