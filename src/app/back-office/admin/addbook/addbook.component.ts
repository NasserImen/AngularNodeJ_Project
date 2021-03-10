import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { element } from 'protractor';
import { AddBooksService } from '../add-books.service';
import {Livre} from '../Models/LivreModel'
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
  book : Livre ;submitted=false;

  Livre=new FormGroup({
  titre:new FormControl('',[Validators.required]),
  auteur:new FormControl('',[Validators.required]),
  categorie: new FormControl('',[Validators.required]),
  maisonEdition:new FormControl('',[Validators.required]),
  anneeEdition:new FormControl('',[Validators.required]),
  langue:new FormControl('',[Validators.required]),
  stock:new FormControl('',[Validators.required]),
  prix:new FormControl('',[Validators.required]),
  type:new FormControl('',[Validators.required])
})
livres:Livre[];
UploadFiles:File[]=[];
  constructor(private _snackBar: MatSnackBar,private LivreService:AddBooksService) { }

  ngOnInit() {
  }
  onSelect(event){
  this.UploadFiles.push(...event.addedFiles)

  
  }
  
  AddLivre(message:string,action:string){
  this.submitted=true;

if(this.Livre.valid && this.UploadFiles.length!=0){
  var data=this.Livre.getRawValue()
  var   formData :FormData= new FormData()

formData.set("titre",data.titre  );
formData.set('auteur', data.auteur);
formData.set('categorie', data.categorie) ;  
formData.set('maisonEdition', data.maisonEdition)  ;
formData.set('anneeEdition', data.anneeEdition);
formData.set('langue',data.langue);
formData.set('stock',data.stock) ;
formData.set('prix',data.prix);
formData.set('type',data.type);

//Append uploaded image to formdata
let fileLenght=this.UploadFiles.length;
if(fileLenght>0){
for(let i=0;i<fileLenght;i++){
 formData.append('images',this.UploadFiles[i])
}
} 
  this.LivreService.AddLivres(formData).subscribe(res=>{}
  ,err=>{
    console.log(err);
    
  },()=>{
  
  })
  this.submitted=false;

  this.Livre.reset()
  this.UploadFiles=[]
  
}else{
  this._snackBar.open('ATTENTION:', 'Merci de saisir tous les champs', {
    duration: 2000,

})
    
}
  }
}

