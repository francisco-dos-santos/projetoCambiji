
export const iconCart=document.getElementById("icon-cart");
const containerCardsCart=document.getElementById("content-cards-cart")
let TotalValueCart=document.getElementById("Total-Cart");
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
    carts[pos].quantity+=1 
    savecartStorage()
    renderCart();
    getTotalValues(); 
  }
  
}
function decrementP(pos){
  if(carts[pos].quantity===1){
    let isdel=window.confirm(`Desejas eliminar o ${carts[pos].product} do carrinho?`);
    if(isdel){
      carts.splice(pos,1);
    }
  }else{
    carts[pos].quantity-=1;
  }
  savecartStorage()
  renderCart();
  getTotalValues();
}
function renderCart(){
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
  })
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
  getTotalValues();
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
let savecartStorage=()=>localStorage.setItem("BD_carts",JSON.stringify(carts));
export function addCart(productId ,products){
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
  renderCart();
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
}
export function handleClicksButtons(){
  containerCardsCart.addEventListener('click', function(event){
    if (event.target.classList.contains('btn-less')) {
      let index = parseInt(event.target.id);
      decrementP(index);
    } else if(event.target.classList.contains('btn-plus')) {
      let index = parseInt(event.target.id);
      incrementP(index);
    }
  });
}
document.addEventListener('DOMContentLoaded',function(){
  iconCart.dataset.count=carts.length;
  document.querySelector(".quantity").textContent=carts.length;
  getTotalValues();
  renderCart();
})

 export function goFinallyShopping(){
  btnfinallyCart.addEventListener('click',()=>{
    window.location.href="../pages-logado/carrinho-logado.html";
  })
}



