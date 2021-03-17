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
// NumOrder:string;
// date:string;
// Total:number;
// userId:value;
// DeliveryMethod:string;
// CardNumber:string;
// status:string;
// products:value,

  // public dialogRef:MatDialogRef<ComandDetailsComponent>
constructor(public service: CommandService, private dialog: MatDialog,) { }
  // count=interval(1500);

  // subscription = this.count.subscribe(value => {
  //   if (this.dialogRef && this.dialogRef.componentInstance) {
  //     this.dialogRef.componentInstance.data = {
  //       NumOrder:value,
  //       date:value,
  //       Total:value,
  //       userId:value,
  //       DeliveryMethod:value,
  //       CardNumber:value,
  //       status:value,
  //       products:value,
        // images:value,
        // langue:value,
        // id:value
  //     };
  //   }
  // });

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
    width: '850px',
    height: '600px',
    data:{
      command
    }
  });
}
}
