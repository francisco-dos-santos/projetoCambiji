import {addNameUser} from"./workheaderLogado.js";
import { initWorkCartPage} from "./workCart.js";

function initWorkDataShopping(){
  const shopping=JSON.parse(sessionStorage.getItem('shopping'));
  if(shopping){
  const wrapperTitle=document.querySelector('.wrappeer-title-shopping');
  const goPerfil=document.querySelector('.go-perfil');
  wrapperTitle.querySelector('.wrapper-code h4').textContent=shopping.codeverify;
  wrapperTitle.querySelector('.wrapper-date h4').textContent=shopping.date+ ' «» '+shopping.time;
  wrapperTitle.querySelector('.wrapper-total h4').textContent='A0A '+shopping.valor.toFixed(2);
  wrapperTitle.querySelector('.wrapper-payment h4').textContent=shopping.payment;
  const wrapperRequest=document.querySelector('.wrapper-shoppings-request');
  wrapperRequest.querySelector('.shopping-request-title .total-shopping').textContent='A0A '+shopping.valor.toFixed(2);

  goPerfil.addEventListener('click',function(){
    sessionStorage.removeItem('shopping');
    sessionStorage.setItem('see-shoppigs',JSON.stringify(true));
    window.location.href="../pages-logado/perfil.html";
  });

  function renderProdutos(){
    const containerRequest=wrapperRequest.querySelector('.container-request');
    containerRequest.innerHTML="";
    shopping && shopping.products && shopping.products.forEach(product=>{
      let productList=`
      <div class="shopping-request">
        <h4><span class="name-product">${product.product}</span> X <span class="quantity">${product.quantity}</span></h4>
        <p class="price-product">A0A 
        ${product.priceNew?(product.priceNew*product.quantity).toFixed(2):(product.price*product.quantity).toFixed(2)}</p>
      </div>
      `;
      containerRequest.innerHTML+=productList;

    });
  }

  renderProdutos();

  }

}

document.addEventListener("DOMContentLoaded", function(){
  addNameUser();
  initWorkCartPage();
  initWorkDataShopping();
});