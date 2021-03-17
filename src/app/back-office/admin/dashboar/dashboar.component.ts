import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable,interval } from 'rxjs';

import { AddBooksService } from '../add-books.service';
import { Livre } from '../Models/LivreModel';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Color, BaseChartDirective, Label } from "ng2-charts";
@Component({
  selector: 'app-dashboar',
  templateUrl: './dashboar.component.html',
  styleUrls: ['./dashboar.component.scss']
})
export class DashboarComponent implements OnInit {
 UpdateLivre:any;
 titre:string
 auteur:string
 maisonEdition:string
 anneeEdition:number
 categorie:string
 stock:number;
 prix:number;
 type:string
 images:string;
 langue:string
 id:any;

 public typeChart: ChartType = "pie";

  public labels: Label[] = [];
 public  data:number []=[];

  public datasets: ChartDataSets[] = [
    {
      label: "# of Votes",
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


 ListLivres=[];
 public dialogRef:MatDialogRef<ConfirmationDialogComponent>
  constructor(private LivresService:AddBooksService,private dialog: MatDialog,
    private snackBar: MatSnackBar ) { 
      
    }
   count=interval(1500);
    

  subscription = this.count.subscribe(value => {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.data = {
        titre:value,
        auteur:value,
        maisonEdition:value,
        anneeEdition:value,
        categorie:value,
        stock:value,
        type:value,
        prix:value,
        images:value,
        langue:value,
        id:value
      };
    }
  });

  ngOnInit() {
    this.LivresService.getAllLivres().subscribe(res=>{
      this.ListLivres=res;
    
    }
    ,err=>{console.log(err);
    },()=>{ this.ListLivres.forEach(e=>{
      this.labels.push(e.titre)
      this.data.push(e.stock)
    }) 
    } )
    
    
  }
  DeleteLivre(id){
    
     this.LivresService.DeleteLivre(id).subscribe(()=>{this.ngOnInit()
     })
  }
  UpdateBook(i){
    this.titre=this.ListLivres[i].titre
    this.auteur=this.ListLivres[i].auteur
    this.maisonEdition=this.ListLivres[i].maisonEdition
    this.anneeEdition=this.ListLivres[i].anneeEdition
    this.categorie=this.ListLivres[i].categorie
    this.stock=this.ListLivres[i].stock
    this.type=this.ListLivres[i].type
    this.prix=this.ListLivres[i].prix
    this.images=this.ListLivres[i].images
    this.langue=this.ListLivres[i].langue
     this.id=this.ListLivres[i]._id

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width: '850px',
      height: '600px',
      data:{
        titre:this.titre,
        auteur:this.auteur,
        maisonEdition:this.maisonEdition,
        anneeEdition:this.anneeEdition,
        categorie:this.categorie,
        stock:this.stock,
        type:this.type,
        prix:this.prix,
        images:this.images,
        langue:this.langue,
        id:this.id
      }
    });
     
    const snack = this.snackBar.open('Thanks to update your book');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('book updated succusfuly', '', {
          duration: 2000,
        });
      }
      else{
        snack.dismiss()
      }
      this.ngOnInit()
    });
  }
}
