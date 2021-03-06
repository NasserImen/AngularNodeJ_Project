import { Component, Inject } from '@angular/core'  ;
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AddBooksService } from '../add-books.service';
import { Livre } from '../Models/LivreModel';

@Component({
  selector: 'app-confirmation-dialog',
  
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  ListLivres:Livre[]=[]
  Livre=new FormGroup({
    titre:new FormControl(this.data.titre,[Validators.required]),
    auteur:new FormControl(this.data.auteur,[Validators.required]),
    categorie: new FormControl(this.data.categorie,[Validators.required]),
    maisonEdition:new FormControl(this.data.maisonEdition,[Validators.required]),
    anneeEdition:new FormControl(this.data.anneeEdition,[Validators.required]),
    langue:new FormControl(this.data.langue,[Validators.required]),
    stock:new FormControl(this.data.stock,[Validators.required]),
    prix:new FormControl(this.data.prix,[Validators.required]),
    type:new FormControl(this.data.type,[Validators.required])
  })
  LivreUpdated=new FormGroup({
    titre:new FormControl(),
    auteur: new FormControl(),
    categorie: new FormControl(),
    maisonEdition:new FormControl(),
    anneeEdition:new FormControl(),
    langue:new FormControl(),
    stock:new FormControl(),
    prix:new FormControl(),
    type:new FormControl()
  })
  category:any;
  UploadFiles:File[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,public LivresService:AddBooksService ) {
     
    
      }
      ngOnInit() {
    this.category=this.data.categorie
    console.log(this.data.images);
    
  }

      onSelect(event){
        this.UploadFiles.push(...event.addedFiles)
      
        
        }
        UpdatedBook(livre){
     this.Livre=new FormGroup({
      titre:new FormControl(livre.titre),
      auteur: new FormControl(livre.auteur),
      categorie: new FormControl(livre.categorie),
      maisonEdition:new FormControl(livre.maisonEdition),
      anneeEdition:new FormControl(livre.anneeEdition),
      langue:new FormControl(livre.langue),
      stock:new FormControl(livre.stock),
      prix:new FormControl(livre.prix),
      type:new FormControl(livre.type)

     })
        }
  onConfirmClick():void {
    var UpdatedData=this.Livre.value
    
    var   formData :FormData= new FormData()
  
  formData.set("titre",UpdatedData.titre  );
  formData.set('auteur', UpdatedData.auteur);
  formData.set('categorie', UpdatedData.categorie) ;  
  formData.set('maisonEdition', UpdatedData.maisonEdition)  ;
  formData.set('anneeEdition', UpdatedData.anneeEdition);
  formData.set('langue',UpdatedData.langue);
  formData.set('stock',UpdatedData.stock) ;
  formData.set('prix',UpdatedData.prix);
  formData.set('type',UpdatedData.type);
  
  // Append uploaded image to formdata
  for(let i=0;i<this.UploadFiles.length;i++){
  if(this.UploadFiles.length>0){
    formData.set('images',this.UploadFiles[i])
  }
  else if(this.UploadFiles.length<=0){
    formData.set('images',this.data.images)
  }
  
}
  
  
  
  this.LivresService.UpdateLivre(formData,this.data.id).subscribe(res=>{console.log(res),err=>{},()=>{ 

  };
  })

  this.dialogRef.close(true);
  
  }

}