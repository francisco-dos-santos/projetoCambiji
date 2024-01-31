import { ConfirmModal, Modal } from "./modal.js";
export const iconCart=document.getElementById("icon-cart");
const btnfinallyCart=document.getElementById("finally-cart-button");
const carts=JSON.parse(localStorage.getItem("BD_carts"))??[];


export const openCart={
  boxCart:document.querySelector(".container-cart"),
  btncloseCart:document.getElementById("close-cart"),
  open(){
    this.boxCart.classList.add("open");
  },
  close(){
    this.boxCart.classList.remove("open");
  }
} 
function incrementP(pos){
  if(carts[pos].quantity===10){
    return;
  }else{
    carts[pos].quantity+=1;
    savecartStorage();
    renderCart();
    renderShopping();
    getTotalValues(); 
  }
  console.log("entrou na funcão incrementar ")
}
async function decrementP(pos){
  if(carts[pos].quantity===1){
    let isdel= await ConfirmModal.open(`Desejas eliminar o "${carts[pos].product}" do carrinho?`);
    if(isdel){
      carts.splice(pos,1);
    }
  }else{
    carts[pos].quantity-=1;
  }
  savecartStorage()
  renderCart();
  renderShopping();
  getTotalValues();
  console.log("entrou na funcão decrementar ")
}
function renderCart(){
  const containerCardsCart=document.getElementById("content-cards-cart");
  containerCardsCart.innerHTML="";
  let newcart;
  carts.forEach((element,index)=> {
    newcart=`
    <div class="content-card-cart">
    <div class="content-img">
      <img src="../assets/${element.imageProduct}" alt="produto-${index}">
    </div>
    <div class="contents-info-product-cart">
      <p>${element.product}<br><span class="description-cart">descrição...</span></p>
      <div class="content-price-quantity">
        <p class="price-cart">Kz ${element.price}</p>
        <div class="content-add-quantity">
          <button class="control-less-plus btn-less" id="${index}">–</button>
          <input type="button" id="input-quantity" value="${element.quantity}">
          <button class="control-less-plus btn-plus" id="${index}">+</button>
        </div>
      </div>
    </div>
  </div>
    `;
    containerCardsCart.innerHTML+=newcart;
  });
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
  getTotalValues();
}
function renderShopping(){
  const containerCardsShopping=document.querySelector(" #shopping-info .carts-cont");
  if(!containerCardsShopping){
    console.error("Element container da pagina carrinnho não encontrado");
    return;
  }
  containerCardsShopping.innerHTML="";
  let newcartShopping;
  carts.forEach((element,index)=>{
    newcartShopping=`
    <div class="cart-product">
    <div class="product-content">
      <div class="content-img">
        <img
          src="../assets/${element.imageProduct}"
          alt="produto-imagem"
        />
      </div>
      <div class="name-product">
        <p>${element.product}</p>
        <small>descrição</small>
      </div>
    </div>
    <div class="content-size">
      <select name="size" id="size">
        <option value="10">
          10
        </option>
        <option value="30">
          30
        </option>
        <option value="15">
          15
        </option>
        <option value="50">
          50
        </option>
      </select>
    </div>
    <div class="price-cont">
      <p>
        A0 <span class="price">
          ${element.price}
        </span>
      </p>
    </div>
    <div class="add-quantity">
      <button  class="control btn-less-shopping " id="${index}" >–</button>
      <input type="text" id="input-quant" value="${element.quantity}" size="2">
      <button  class="control btn-plus-shopping " id="${index}">+</button>
    </div>
    <div class="tl-price-cont">
      <p>A0 <span class="tl-price">
        ${element.price*element.quantity}
      </span>
      </p>
    </div>
    <div class="content-deletar">
      <button class="deletar delete" id="${index}">
        <img src="../assets/imagens/icons8_delete.ico" alt="buttton deletar" width="20px">
      </button>
    </div>
  </div>
    `;
    containerCardsShopping.innerHTML+=newcartShopping;
  });
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
  getTotalValues();
}
function getTotalValues(){
  let TotalValueCart=document.getElementById("Total-Cart");
  const contentTotalShopping=document.querySelector(".content-total")
  let prices = carts.map((item)=>{
    return Number(item.price)*Number(item.quantity);
  });
  let Total = prices.reduce((prev,next)=>{
    return prev + next;
  },0);
  TotalValueCart.innerText=Total.toFixed(2);
  if(contentTotalShopping){
    let TotalValueShopping=document.getElementById("price-total");
    let subTotalValueshopping=document.getElementById("price-subtotal");
    TotalValueShopping.innerText=Total.toFixed(2);
    subTotalValueshopping.textContent=Total.toFixed(2);
  }
}
function savecartStorage(){
  localStorage.setItem("BD_carts",JSON.stringify(carts));
}
export function addCart(productId ,products){
  let cart=products.find((product)=>product.id==productId); 
  if(carts.length===0){
    carts.push(cart);
    console.log(carts);
  }else{
    let isundefined= carts.find((element)=>element.id==productId)
    if(!isundefined){
      carts.push(cart);
    }else{
      Modal.open("../assets/imagens/icons8_error.ico","Este produto já foi adicionado no carrinho");
    }
  }
  savecartStorage();
  renderCart();
  renderShopping();
  getTotalValues();
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
}
export  function handleClicksButtons(){
  const containerCardsCart=document.getElementById("content-cards-cart");
  const containerCardsShopping=document.querySelector("#shopping-info .carts-cont");

  containerCardsCart.addEventListener('click', (event) => {
    const target = event.target.closest('.btn-less, .btn-plus');
    if (target) {
      const index = parseInt(target.id);
      if (target.classList.contains('btn-less')) {
        decrementP(index);
      } else if (target.classList.contains('btn-plus')) {
        incrementP(index);
      }
    }
  });

  if(containerCardsShopping){
    // console.log("estas na pagina carrinho");
    containerCardsShopping.addEventListener('click',(event)=>{
    if (event.target.classList.contains('btn-less-shopping')){
      var index = parseInt(event.target.id);
      decrementP(index);
    } else if(event.target.classList.contains('btn-plus-shopping')) {
      var index = parseInt(event.target.id);
      incrementP(index);
    }
  });
  return;
  }
}

export function goFinallyShopping(){
  btnfinallyCart.addEventListener('click',(event)=>{
    if(carts.length!==0){
      window.location.href="../pages-logado/carrinho-logado.html";
    }
  });
}

export function initWorkCartPage(){
  iconCart.dataset.count = carts.length;
  document.querySelector(".quantity").textContent = carts.length;
  renderCart();
  renderShopping();
  getTotalValues();
  handleClicksButtons();
  goFinallyShopping();
}

// document.addEventListener('DOMContentLoaded', function () {
//   initWorkCartPage(); estava achamar isso aqui e em outras pages... 
// }); 

/*ESSE você encontrar esse comentário saiba que isso 
estava a me deixar locou fiquei um dia inteiro só drome as 5h.
ESSA FUNCÃO INITIWORKCARTPAGE estva a ser chamso duas vezes permitindo
asim que no carrrinho o botão add + e - add 2 os valores...  
*/

