import {MAT_DIALOG_DATA} from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {command} from '../../Models/command'
@Component({
  selector: 'app-comand-details',
  templateUrl: './comand-details.component.html',
  styleUrls: ['./comand-details.component.scss']
})
export class ComandDetailsComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.command.products);
    
  }

}
