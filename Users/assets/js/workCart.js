
const iconCart=document.getElementById("icon-cart");
const containerCardsCart=document.getElementById("content-cards-cart")
let TotalValueCart=document.getElementById("Total-Cart");
const btnfinallyCart=document.getElementById("finally-cart-button");
const carts=JSON.parse(localStorage.getItem("BD_carts"))??[];
// const btnAddCart=document.getElementsByClassName("add-cart");

const openCart={
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
  if(carts[pos].quantity==10){
    return false;
  }else{
    carts[pos].quantity+=1;
  }
  savecartStorage()
  renderCart();
  getTotalValues()
}
function decrementP(pos){
  if(carts[pos].quantity==1){
    let isdel=window.confirm(`Desejas eliminar o ${carts[pos].product} do carrinho?`);
    if(isdel){
      carts.splice(pos,1);
    }
  }else{
    carts[pos].quantity-=1;
  }
  savecartStorage()
  renderCart();
  getTotalValues()
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
}
function renderCart(){
  containerCardsCart.innerHTML="";
  let newcart;
  carts.forEach((element,index)=> {
    newcart=`
    <div class="content-card-cart">
    <div class="content-img">
      <img src="../assets/${element.imageProduct}" alt="produto-1">
    </div>
    <div class="contents-info-product-cart">
      <p>${element.product}<br><span class="description-cart">descrição...</span></p>
      <div class="content-price-quantity">
        <p class="price-cart">Kz ${element.price}</p>
        <div class="content-add-quantity">
          <button id="btn-less" class="control-less-plus" onclick=decrementP(${index})>--</button>
          <input type="button" id="input-quantity" value="${element.quantity}">
          <button id="btn-plus" class="control-less-plus" onclick=incrementP(${index})>+</button>
        </div>
      </div>
    </div>
  </div>
    `;
    containerCardsCart.innerHTML+=newcart;
  })
}
function getTotalValues(){
  let prices = carts.map((item)=>{
    return Number(item.price)*Number(item.quantity);
  });
  let Total = prices.reduce((prev,next)=>{
    return prev + next;
  },0)
  TotalValueCart.textContent=(Total).toFixed(2);
}

function addCart(productId){
  let cart=products.find((product)=>product.id==productId); 
  if(carts.length===0){
    carts.push(cart);
    console.log(carts);
  }else{
    let isundefined= carts.find((element)=>element.id==productId)
    if(!isundefined){
      carts.push(cart)
    }else{
      alert("this is product yet was add in cart");
    }
    
  }
  savecartStorage();
  getTotalValues();
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
  renderCart();

}

iconCart.dataset.count=carts.length;
document.querySelector(".quantity").textContent=carts.length;
getTotalValues()
renderCart();
let savecartStorage=()=>localStorage.setItem("BD_carts",JSON.stringify(carts));
// callbacks
// events
openCart.btncloseCart.onclick=()=>{
  openCart.close();
}
iconCart.onmousemove=()=>{
  openCart.open();
}
window.addEventListener("keydown",closeWidthESC)
function closeWidthESC(e){
  if(e.key==="Escape"){
    openCart.close();
  }
}