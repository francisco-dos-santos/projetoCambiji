import { Modal } from "./modal.js";

export default function initShoppings(){  
const shopping=document.getElementById("shopping");

class Shoppings{
  constructor(root){
    this.root=document.getElementById(root);
    this.getUsers();
  }
  getUsers(){
    this.users=JSON.parse(localStorage.getItem('BD_Users')) ?? [];
  }

  salveLocalDate(){
    localStorage.setItem('BD_Users',JSON.stringify(this.users));
  }

}


class ShoppingsView extends Shoppings{
  constructor(root){
    super(root)
    this.tbody=this.root.querySelector('table tbody');

    this.showShoppings();
  }

  showShoppings(){
    this.removeAllTr();
    
    for(let user of this.users){
      user && user.shoppings && user.shoppings.forEach((shops)=>{
        const row=this.createRow();

        row.querySelector('td .info-user > .name-user').textContent=user.userName;
        row.querySelector('td .info-user > .email-user').textContent=user.email;
        row.querySelector('td.data-shopping').textContent=shops.date+' «» '+shops.time;
        row.querySelector('td.total-product span').textContent=shops.products.length+' Quatd/s';
        row.querySelector('td.valor-shopping').textContent='A0A '+shops.valor.toFixed(2);
        row.querySelector('td.payment span').textContent=shops.payment;

        if(shops.status){
          row.querySelector('td.status span').textContent='Realizado.';
          row.querySelector('td.status span').style.color='aqua';
          row.querySelector('td.status span').style.borderColor='aqua';
        }
        
        row.querySelector('td.actions .see').onclick=()=>{
          console.log('clicou para ver');
          ModalInfo.openModal(this.root,shops);
        }

        row.querySelector('td.actions .confirm').onclick=()=>{
          let isOk= confirm('Desejas confirmar a compra do usuário '+ user.userName+' ?');
          if(isOk){
            shops.status=true;
            this.salveLocalDate();
            this.showShoppings();
            new Modal({type:"sucess",message:"checkout da compra concluido com exito"});
          }
        }
        
        this.tbody.append(row);
      });

    }
  }

  createRow(){
    let tr= document.createElement("tr");

     tr.innerHTML=`
      <td class="td-user-avatar">
          <img src="../assets/imagens/icons8_male_user.ico" 
          alt="imagem do produto" width="40px" />
          <p class="info-user">
            <strong class="name-user">Francisco dos Santos</strong>
            <br>
            <small class="email-user">francsicodeveloper@gmail.com</small>
          </p>
      </td>
      <td class="data-shopping">04/02/2024</td>
      <td class="total-product"><span>5</span></td>
      <td class="valor-shopping">A0A 20000.00</td>
      <td class="payment">
        <span>Paypel</span>
      </td>
      <td class="status">
        <span>Pendente</span>
      </td>
      <td class="actions">
        <button class="menu-v" title="Menu de opções">•••</button>
        <div class="dropdrow">
          <button class="see" title="ver informações da compra">
            <img src="../assets/imagens/icons8_eye.ico" width="18px" alt="eyes">
            Ver
          </button>
          <button class="confirm" title="Confirmar a Compra">&check; Confirmar</button>
        </div>
      </td>
    `;

    return tr;
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr').forEach(tr=>tr.remove());
  }

}

class ModalInfo{
  constructor(root,shopping){
    this.shopping=shopping;
    this.root=root;
    this.wrapperInfoModal=this.root.querySelector('.wrapper-modal-info');
    this.backBtn=this.wrapperInfoModal.querySelector('.back-section');
  }
 static openModal(root,shopping){
    let modal=new ModalInfo(root,shopping);
    modal.wrapperInfoModal.classList.toggle('show-info-modal');
    // console.log(shopping);
    modal._renderProducts(shopping);
    modal._showFullModal(shopping);
    modal.backBtn.onclick=()=>{
      modal.wrapperInfoModal.classList.toggle('show-info-modal');
    }
  }

  _renderProducts(shopping){
    const ulProducts = this.wrapperInfoModal.querySelector('.wrapper-list-products ul.content-products');
    ulProducts.innerHTML="";
    shopping.products.forEach(product => {
      let li;

      li=`
      <li class="product-shop">
        <div class="content-info-product">
          <img src="${product.imageProduct}" alt="imagem produto">
          <div class="info-product">
            <h5>${product.product}</h5>
            <small>${product.category}</small>
          </div>
        </div>

        <div class="content-add-info">
          <small><strong>${product.price} x ${product.quantity}=A0A ${Number(product.price*product.quantity).toFixed(2)}</strong></small>
          <p>
            <small>${product.mark}</small>
            <small>size:${product.size}ml</small>
          </p>
        </div>
      </li>`
      ;

    ulProducts.innerHTML+=li;
    });

    
   
  }

  _showFullModal(shopping){
    const fullInfo=this.wrapperInfoModal.querySelector('.info-full-shop');
    fullInfo.querySelector('.adress > p').textContent=shopping.adress;
    fullInfo.querySelector('.adress > p').setAttribute('title',shopping.adress);
    fullInfo.querySelector('span.date-shop').textContent=shopping.date+' - '+shopping.time.replaceAll(":","h");
    fullInfo.querySelector('span.mobile').textContent='['+shopping.numberPhone+']';
    fullInfo.querySelector('span.total-shop').textContent='A0A '+(shopping.valor).toFixed(2);
    fullInfo.querySelector('span.province').textContent=shopping.province;
    fullInfo.querySelector('span.city').textContent=shopping.municipe;
    fullInfo.querySelector('span.payment').textContent=shopping.payment;

    if(shopping.status){
      fullInfo.querySelector('small.status').textContent='Realizado';
      fullInfo.querySelector('small.status').style.color="aqua";
      fullInfo.querySelector('small.status').style.borderColor='aqua';
    }else{
      fullInfo.querySelector('small.status').textContent='Pendente';
    }
    
  }

}



if(shopping){
  // console.log(shopping);
  new ShoppingsView(shopping.id);
}

}