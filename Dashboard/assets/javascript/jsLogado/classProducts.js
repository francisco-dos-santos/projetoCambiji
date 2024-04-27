 
import { Modal} from "./modal.js";

 class Product{
  constructor({product,price,category,description,imageProduct,id,stock,size,mark}){
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
  constructor({priceNew,porcent,product,price,category,description,imageProduct,id,stock,size,mark}){
    super({priceNew,porcent,product,price,category,description,imageProduct,id,stock,size,mark});
    this.priceNew=Number(priceNew);
    this.porcent=porcent;
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
  static addProduct({product,price,category,description,imageProduct,stock,size,mark})
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
          new Modal({type:'sucess',message:'Produto cadastrado, veja o na lista de produtos!'});
         },800);
      }else{
        console.error('esse produto já existe');
        new Modal({type:'error',message:'já existe produto com esse nome, digite outro'});
      }
  }
  static addProductDeals({priceNew,porcent,product,price,category,description,imageProduct,stock,size,mark})
    {
      const P = new Products();
      if(!P._contains(product)){
        P.List.push(new ProductDeals(
         {
          priceNew,
          porcent,
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
          new Modal({type:'sucess',message:'Produto cadastrado, veja o na lista de produtos em promoção!'});
         },800);
      }else{
        console.error('esse produto já existe');
        new Modal({type:'error',message:'já existe produto com esse nome, digite outro'});
      }
  }

  delete(id){
   const P = new Products(); 
    P.List.splice(id,1);
    P._saveNoStorage();
   }

  static editProduct({id,status="",priceNew="",porcent="",product,price,category,description,imageProduct,stock,size,mark}){
    const P = new Products(); 
    if(Boolean(status) && Boolean(priceNew)){
      P.List[id].priceNew=Number(priceNew);
      P.List[id].category=category;
      P.List[id].porcent=porcent;
      P.List[id].product=product;
      P.List[id].price=Number(price);
      P.List[id].description=description;
      P.List[id].imageProduct=imageProduct;
      P.List[id].stock=Number(stock);
      P.List[id].size=size;
      P.List[id].mark=mark;
      P._saveNoStorage();
      document.body.querySelectorAll(".asidebar-setting > button.btn-sidebar")[2].click();
    }else{
      P.List[id].category=category;
      P.List[id].product=product;
      P.List[id].price=Number(price);
      P.List[id].description=description;
      P.List[id].imageProduct=imageProduct;
      P.List[id].stock=Number(stock);
      P.List[id].size=size;
      P.List[id].mark=mark;
      P._saveNoStorage();
      document.body.querySelectorAll(".asidebar-setting > button.btn-sidebar")[1].click();
    }
    setTimeout(()=>{
      new Modal({type:'sucess',message:'Produto Editado com sucesso!'});
     },500);
  }

  _saveNoStorage(){
    localStorage.setItem('BD_products',JSON.stringify(this.List));
  }
}

export class updateProduct extends Products{
  constructor(root){
    super(root);
    this.root=document.getElementById(root);
    this.wrapperProducts = this.root.querySelector('.wrapper-products');
    this._update({root:this.root , wrapperProducts:this.wrapperProducts});
  }
  _update({root,wrapperProducts}){
    this.removeAllCard();

    if(root.id!=="list-Products"){
      let q=0;
      this.List.forEach( product => {
        const card = this._createProduct();

        if(product.status){
          q+=1;
          root.querySelector('.q').textContent='+ de '+parseInt(q-1)+' prod...';
          card.querySelector('.content-img img').setAttribute('src',product.imageProduct);
          card.querySelector('.percentage').textContent=product.porcent+'%';
          card.querySelector('.price').textContent='A0A '+product.priceNew.toFixed(2);
          card.querySelector('.name-product').textContent=product.product;
          card.querySelector('.category').textContent=product.category;
          card.querySelector('.stock').textContent='Stock:'+product.stock;
          card.querySelector('.text-risck').textContent='A0A '+product.price;  
          card.querySelector('button.see-product').onclick=()=>{
            console.log('clicou para ver');
            ModalInfo.openModal(root.parentNode,product);
          }

          card.querySelector('button.edit-product').onclick=()=>{
            document.body.querySelectorAll("aside > .wrapper-logout-settings> button")[0].click();
            let edit={
              id:product.id,
              status:product.status
            }
            sessionStorage.setItem("Edit-product",JSON.stringify(edit));
          }

          card.querySelector('button.clear-product').onclick=()=>{
            let isOk=confirm('Desejas eliminar o produto '+product.product+'!');
            if(isOk){
              this.delete(card.id);
              setTimeout(()=>{
                document.querySelector('.asidebar-setting [content_Id='+root.id+']').click();
                new Modal({type:'sucess',message:'Produto Eliminado, o produto já não existe!'});
               },400);
            }
          }
          
          wrapperProducts.append(card);
        }
          
      });

    }else{
      let q=0;
      this.List.forEach( product => {
        const card = this._createProduct();
  
        if(!product.status){
          q+=1;
          root.querySelector('.q').textContent='+ de '+parseInt(q-1)+' prod...';
          card.querySelector('.percentage').style.display="none";
          card.querySelector('.content-img img').setAttribute('src',product.imageProduct);
          card.querySelector('.price').textContent='A0A '+product.price.toFixed(2);
          card.querySelector('.name-product').textContent=product.product;
          card.querySelector('.category').textContent=product.category;
          card.querySelector('.stock').textContent='Stock:'+product.stock;

          card.querySelector('button.see-product').onclick=()=>{
            console.log('clicou para ver');
            ModalInfo.openModal(root.parentNode,product);
          }

          card.querySelector('button.edit-product').onclick=()=>{
            document.body.querySelectorAll("aside > .wrapper-logout-settings> button")[0].click();
            let edit={
              id:product.id
            }
            sessionStorage.setItem("Edit-product",JSON.stringify(edit));
          }
          
          card.querySelector('button.clear-product').onclick=()=>{
            let isOk=confirm('Desejas elimnar o produto '+product.product+'!');
            if(isOk){
              this.delete(card.id);
              setTimeout(()=>{
                document.querySelector('.asidebar-setting [content_Id='+root.id+']').click();
                new Modal({type:'sucess',message:'Produto Eliminado, o produto já não existe!'});
               },400);
            }
          }
          
          wrapperProducts.append(card);
        }
          
      });
    }

  }

  _createProduct(){
    const cardProduct = document.createElement("div");
    cardProduct.classList.add('card-product');

    cardProduct.innerHTML=`
    <div class="content-img">
      <img src="../assets/imagens/avatar-miro.png" alt="produto-1">
        <div class="percentage" id="porcent">50%</div>
      </div>
      <h3 class="price">A0 200.00</h3>
      <p class="name-product">Nome</p>
      <p class="category">Categoria</p>
      <del class="text-risck"></del>
      <div class="content-actons-stk">
        <small class="stock">Stock:50</small>
        <div class="actions">
          <button class="see-product"title="Ver informações">
            <img src="../assets/imagens/icons8_eye.ico" width="16" alt="eyes ">
          </button>
          <button class="edit-product" title="Editar informações">
            <img src="../assets/imagens/icons8_edit_product.ico" width="16" alt="editar product">
          </button>
          <button class="clear-product" title="Eliminar da lista">
            <img src="../assets/imagens/icons8_delete.ico" width="16" alt="eliminar">
          </button>
        </div>
      </div>
    `;

    return cardProduct;
  }

  removeAllCard(){
    this.wrapperProducts.querySelectorAll('.card-product')
    .forEach(card => card.remove());
  }

}

class ModalInfo{
  constructor(root,product){
    this.product=product;
    this.root=root;
    this.wrapperInfoModal=this.root.querySelector('.wrapper-modal-info');
    this.backBtn=this.wrapperInfoModal.querySelector('.back-section');
  }
 static openModal(root,product){
    let modal=new ModalInfo(root,product);
    modal.wrapperInfoModal.classList.toggle('show-info-modal');
    // console.log(product);
    modal.renderInfo(product);
    modal.backBtn.onclick=()=>{
      modal.wrapperInfoModal.classList.toggle('show-info-modal');
    }
  }

  renderInfo(product){
    this.wrapperInfoModal.querySelector('.wrapper-img-product img').src=product.imageProduct;
    this.wrapperInfoModal.querySelector('ul li .name-product').textContent=product.product;
    this.wrapperInfoModal.querySelector('ul li .category-product').textContent=product.category;
    this.wrapperInfoModal.querySelector('ul li .mark-product').textContent=product.mark;
    this.wrapperInfoModal.querySelector('ul li .stock-product').textContent=product.stock;
    this.wrapperInfoModal.querySelector('ul li .description').textContent=product.description;
    if(product.status){
      this.wrapperInfoModal.querySelector('ul li .old-price').style.display='block';
      this.wrapperInfoModal.querySelector('.wrapper-img-product .porcentage').style.display='block';
      this.wrapperInfoModal.querySelector('ul li .price-product').textContent='A0A '+product.priceNew;
      this.wrapperInfoModal.querySelector('ul li .old-price').textContent='A0A '+product.price;
      this.wrapperInfoModal.querySelector('.wrapper-img-product .porcentage').textContent=product.porcent+'%';
    }else{
      this.wrapperInfoModal.querySelector('ul li .price-product').textContent='A0A '+product.price;
      this.wrapperInfoModal.querySelector('ul li .old-price').style.display='none';
      this.wrapperInfoModal.querySelector('.wrapper-img-product .porcentage').style.display='none';
    }
    
  }
}
