
import { addCart,openCart, iconCart,initWorkCartPage} from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";

fetch("../products.json")
.then((response)=>{
  return response.json();
}).then((data)=>{
  localStorage.setItem('BD_products',JSON.stringify(data));
})

  const products=JSON.parse(localStorage.getItem('BD_products'))??[];
  const containerOfortDay=document.getElementById("ofert-day");
  const containerProducts=document.getElementById("produt-recomed");
  const cronoment=document.getElementById("time");
  
  function renderProducts(){
    let countf=0;
    let countp=0;
    containerOfortDay.innerHTML="";
    containerProducts.innerHTML="";
    products.forEach((element)=>{
      if(countf!==6){
        let des=((element.price*60)/100).toFixed(2);
        let newCard=`
      <div class="card descendo">
        <div class="cont-img">
          <img src="../assets/${element.imageProduct}" alt="produto-1">
          <div class="percentage" id="porcent">60%</div>
        </div>
        <h3 class="preco">A0A ${des}</h3>
        <del class="text-riscado">Kz ${element.price}.00</del>
        <p>${element.product}</p>
        <div class="content">
          <small class="categoria">${element.category}</small>
          <button class="add-cart" id="${element.id}">
            <img src="../assets/imagens/icons8_add_shopping_cart.ico" width:16px; alt="cart">
          </button>
        </div>
    </div>
    `;
    containerOfortDay.innerHTML+=newCard;
    countf++;
      }
      if(countp!==18){
        let newCard=`
      <div class="card subindo">
        <div class="cont-img">
          <img src="../assets/${element.imageProduct}" alt="produto-1"onclick=salveIdProduct(${element.id}) >
          <!--<div class="percentage" id="porcent">60%</div>-->
        </div>
        <h3 class="preco">A0A ${element.price}.00</h3>
        <!--<del class="text-riscado">Kz${element.price}</del>-->
        <p>${element.product}</p>
        <div class="content">
          <small class="categoria">${element.category}</small>
          <button class="add-cart" id="${element.id}">
            <img src="../assets/imagens/icons8_add_shopping_cart.ico"" alt="cart">
          </button>
        </div>
    </div>
    `;
    containerProducts.innerHTML+=newCard;
    countp++;
      }
    });
  }
  
//functions exexute
setTimeout(()=>{
  renderProducts();
   document.addEventListener('click', function(event){
    if(event.target.parentNode.classList.contains('add-cart')){
      let id = parseInt(event.target.parentNode.id);
      addCart(id,products);
    }
   })
},1500)

// events
openCart.btncloseCart.onclick=()=>{
  openCart.close();
}
iconCart.onmousemove=()=>{
  openCart.open();
}
window.addEventListener("keydown",closeWidthESC)
function closeWidthESC(event){
  if(event.key==="Escape"){
    openCart.close();
  }
}
document.addEventListener("DOMContentLoaded", function(){
  addNameUser();
  initWorkCartPage();
})


containerOfortDay.innerHTML=`<h3 
  style="width:100vw;
  height:250px; 
text-align:center;">buscando dados...</h3>`;
containerProducts.innerHTML=`<h3 
  style="width:100vw;
  height:250px; 
text-align:center;">buscando dados...</h3>`;

