export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class Product {
  constructor(public id: number,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public availibilityCount: number,
              public cartCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public categoryId: number){ }
}
 export class book {
  titre:{type:String,required:true}
  auteur:{type:String,required: true}
  maisonEdition:{type:String,required: true}
  anneeEdition:{type:Number,required:true}
  categorie:{type:String,required:true}
  langue:{type:String,required:true}
  images: {type:String,required:true}
  stock:{type:Number,required:true}
  etat:{type:String,required:true}
  prix:{type:number,required:true}
 }