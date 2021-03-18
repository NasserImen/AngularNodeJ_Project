import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { interval } from 'rxjs';
import { CommandService } from 'src/app/services/command.service';
import { command } from '../Models/command';
import { ComandDetailsComponent } from './comand-details/comand-details.component';


@Component({
  selector: 'app-listcommands',
  templateUrl: './listcommands.component.html',
  styleUrls: ['./listcommands.component.scss']
})
export class ListcommandsComponent implements OnInit {
listCommands:command[]=[]


constructor(public service: CommandService, private dialog: MatDialog,) { }


  ngOnInit() {
    this.getCommands();
    
  }
getCommands(){
this.service.getAllCommands().subscribe(res=>{
  this.listCommands=res 
  
 },
 err =>{console.log(err)},
 ()=>{console.log(this.listCommands) })
}
DetailCommand(command){
  const dialogRef = this.dialog.open(ComandDetailsComponent,{
    width: '950px',
    height: '600px',
    data:{
      command
    }
  });
}
OnHoldOrder(command){
  var order={
  status:command.status="On Hold"
  }
  this.service.UpdateCommand(command._id,order).subscribe(res=>{console.log(res);
  })
}
AcceptOrder(command){
  var order={
    status:command.status="validée"
    }
    this.service.UpdateCommand(command._id,order).subscribe(res=>{console.log(res);
    })
}
}
