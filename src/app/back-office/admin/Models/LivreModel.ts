export class Livre{
    _id:number;
    titre:string;
    auteur:string;
    maisonEdition:string;
    anneeEdition:number;
    categorie:string;
    langue:string;
    images:string;
    stock:number;
    prix:number;
    type:string;
    cardCount:number
    constructor(titre:string){
        this.titre = titre
    }
};