import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable,interval } from 'rxjs';

import { AddBooksService } from '../add-books.service';
import { Livre } from '../Models/LivreModel';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

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
 etat:string
 images:string;
 langue:string
 id:any;

 ListLivres=[];
 public dialogRef:MatDialogRef<ConfirmationDialogComponent>
  constructor(private LivresService:AddBooksService,private dialog: MatDialog,
    private snackBar: MatSnackBar ) { }
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
        etat:value,
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
    },()=>{} )
    
  }
  DeleteLivre(id){
    
     this.LivresService.DeleteLivre(id).subscribe(res=>{console.log(res),()=>{},()=>{}; })
  }
  UpdateBook(i){
    this.titre=this.ListLivres[i].titre
    this.auteur=this.ListLivres[i].auteur
    this.maisonEdition=this.ListLivres[i].maisonEdition
    this.anneeEdition=this.ListLivres[i].anneeEdition
    this.categorie=this.ListLivres[i].categorie
    this.stock=this.ListLivres[i].stock
    this.etat=this.ListLivres[i].etat
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
        etat:this.etat,
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
    });
  }
}
