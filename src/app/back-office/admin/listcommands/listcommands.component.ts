import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { interval } from 'rxjs';
import { CommandService } from 'src/app/services/command.service';
import { command } from '../Models/command';
import { ComandDetailsComponent } from './comand-details/comand-details.component';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";


@Component({
  selector: 'app-listcommands',
  templateUrl: './listcommands.component.html',
  styleUrls: ['./listcommands.component.scss']
})
export class ListcommandsComponent implements OnInit {
listCommands:any

public typeChart: ChartType = "bar";

  public labels: any[] = [];
      public  data:any[]=[];

  public datasets: ChartDataSets[] = [
    {
      label: "# total of the order",
      data:this.data,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ];

  public options: ChartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
constructor(public service: CommandService, private dialog: MatDialog,) { }


  ngOnInit() {
    this.getCommands();
    
  }
getCommands(){
this.service.getAllCommands().subscribe(res=>{
  this.listCommands=res 
  
 },
 err =>{console.log(err)},
 ()=>{this.listCommands.forEach(command=>{
        this.data.push(command.Total)
        this.labels.push(command.NumOrder)
 }); 
 
})
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
