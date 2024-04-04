 
import { Modal} from "./modal.js";

 class Product{
  constructor({
    product,price,
    category,description,
    imageProduct,id,
    stock,size,mark
  }){
      this.product=product;
      this.price=Number(price);
      this.imageProduct=imageProduct;
      this.category=category;
      this.description=description;
      this.quantity=1;
      this.stock=Number(stock);
      this.size=size;
      this.mark=mark;
      this.id=Number(id);
    }
 }
 class ProductDeals extends Product{
  constructor({priceNew,
    product,price,category,
    description,imageProduct,id,
    stock,size,mark
  }){
    super({priceNew,product,price,category,description,imageProduct,id,stock,size,mark});
    this.priceNew=Number(priceNew);
    this.status='deals';
  }
 }

export class Products {
  constructor() {
    this.List = JSON.parse(localStorage.getItem("BD_products"))??[];
  }
  _contains(name){
    return this.List.some(item=> item.product.includes(name));
  }
  static addProduct(
    {product,price,category,description,
    imageProduct,stock,size,mark})
    {
      const P = new Products();
      if(!P._contains(product)){
        P.List.push(new Product(
         {
          product,
          price,
          category,
          description,
          imageProduct,
          stock,
          size,
          mark,
          id:P.List.length
         })); 

         P._saveNoStorage();
         document.body.querySelectorAll("aside > .wrapper-logout-settings> button")[0].click();
         setTimeout(()=>{
          new Modal({cor:'hsl(var(--hue), 62%, 63%)',message:'Cadastro de produto concluido, veja o na lista!'});
         },800);
      }else{
        console.error('esse produto já existe');
        new Modal({cor:'hsl(0, 96%, 50%)',message:'já existe produto com esse nome digite outro'});
      }
  }
  static addProductDeals(
    {priceNew,product,price,category,description,
    imageProduct,stock,size,mark})
    {
      const P = new Products();
      if(!P._contains(product)){
        P.List.push(new ProductDeals(
         {
          priceNew,
          product,
          price,
          category,
          description,
          imageProduct,
          stock,
          size,
          mark,
          id:P.List.length
         })); 

         P._saveNoStorage();
         document.body.querySelectorAll("aside > .wrapper-logout-settings> button")[0].click();
         setTimeout(()=>{
          new Modal({cor:'hsl(var(--hue), 62%, 63%)',message:'Cadastro de produto concluido, veja o na lista!'});
         },800);
      }else{
        console.error('esse produto já existe');
        new Modal({cor:'hsl(0, 96%, 50%)',message:'já existe produto com esse nome digite outro'});
      }
  }

  static delete(id){
   const P = new Products(); 
   let isProduct = P.List.find(Element=>Element.id===id);
   if(isProduct){
    P.List.slice(id,1);
    P._saveNoStorage();
   }
  }

  static editProduct(id){

  }

  _saveNoStorage(){
    localStorage.setItem('BD_products',JSON.stringify(this.List));
  }
}

