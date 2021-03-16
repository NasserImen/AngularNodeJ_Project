import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';
import { command } from '../Models/command';


@Component({
  selector: 'app-listcommands',
  templateUrl: './listcommands.component.html',
  styleUrls: ['./listcommands.component.scss']
})
export class ListcommandsComponent implements OnInit {
listCommands=[]
  constructor(private service: CommandService) { }

  ngOnInit() {
    this.getCommands();
  }
getCommands(){
this.service.getAllCommands().subscribe(res=>{
  this.listCommands=res ,
  (err) =>{console.log(err), ()=>{console.log(this.listCommands);
  }
  }
} )
}
}
