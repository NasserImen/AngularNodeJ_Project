export class Livre{
    titre:string;
    auteur:string;
    maisonEdition:string;
    anneeEdition:number;
    categorie:string;
    langue:string;
    images:string;
    stock:number;
    prix:number;
    etat:string;
    constructor(titre:string){
        this.titre = titre
    }
};