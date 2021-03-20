import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { command } from 'src/app/back-office/admin/Models/command';
import { CommandService } from 'src/app/services/command.service';
import { OrderDetailsComponent } from './order-details/order-details.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  listCommands:any;
found:command[];
 
  constructor(public service: CommandService, private dialog: MatDialog) { }
// init(){
//   this.getCommands()
// }
  ngOnInit() {
    this.getCommands()

  }

  getCommands(){
    this.service.getAllCommands().subscribe(res=>{
      this.listCommands=res
      
     },
     err =>{console.log(err)},
     ()=>{  this.found=this.listCommands.filter(order=>

      order.userId==localStorage.getItem("userId")
      
      )
      return this.found;})
    }
    
    DetailCommand(command){
      const dialogRef = this.dialog.open(OrderDetailsComponent,{
        width: '950px',
        height: '600px',
        data:{
          command
        }
      });
    }

}
