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
    etat:new FormControl(this.data.etat,[Validators.required])
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
    etat:new FormControl()
  })
  category:any;
  UploadFiles:File[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,public LivresService:AddBooksService ) {
     
    
      }
      ngOnInit() {
    this.category=this.data.categorie
    
       
       
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
      etat:new FormControl(livre.etat)

     })
        }
  onConfirmClick() {
    var UpdatedData=this.Livre.value
    console.log(UpdatedData);
    
    var   formData :FormData= new FormData()
  
  formData.set("titre",UpdatedData.titre  );
  
  
  formData.set('auteur', UpdatedData.auteur);
  formData.set('categorie', UpdatedData.categorie) ;  
  formData.set('maisonEdition', UpdatedData.maisonEdition)  ;
  formData.set('anneeEdition', UpdatedData.anneeEdition);
  formData.set('langue',UpdatedData.langue);
  formData.set('stock',UpdatedData.stock) ;
  formData.set('prix',UpdatedData.prix);
  formData.set('etat',UpdatedData.etat);
  
  // Append uploaded image to formdata
  let fileLenght=this.UploadFiles.length;
  if(fileLenght>0){
  for(let i=0;i<fileLenght;i++){
   formData.append('images',this.UploadFiles[i])
  }
  }
  
  this.LivresService.UpdateLivre(formData,this.data.id).subscribe(res=>{console.log(res),()=>{},()=>{};
  })

  
    this.dialogRef.close(true);
  }

}