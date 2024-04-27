
import { addCart,openCart, iconCart,initWorkCartPage} from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";
import Countdown from "./countdown.js"; 
import { setError,setSucess,isNumberA0} from "./funtctionValidatyForm.js";
import { Modal } from "./modal.js";


  const products=JSON.parse(localStorage.getItem('BD_products'))??[];
  const containerOfortDay=document.getElementById("ofert-day");
  const containerProducts=document.getElementById("produt-recomed");
  const cronoment=document.getElementById("time");

  const cronoSetInterval=setInterval(initCountDown,1000); 

  function initCountDown(){
    const tempoForEndPromotion=new Countdown({futureDate:'20 April 2024 23:59:59'});
    // console.log(tempoForEndPromotion.total);
      cronoment.innerHTML=
      `${String(tempoForEndPromotion.total.days).padStart(2,'0')}d:
        ${String(tempoForEndPromotion.total.hours).padStart(2,'0')}h:
        ${String(tempoForEndPromotion.total.minutes).padStart(2,'0')}:
        ${String(tempoForEndPromotion.total.seconds).padStart(2,'0')}
      `;
    
    if(tempoForEndPromotion.isTimeDiffEqualZero){
      clearInterval(cronoSetInterval);
       cronoment.textContent='0d:00h:00:00';
       containerOfortDay.innerHTML=`
       <h3 style="width:85vw;
        height:250px; 
        text-align:center;">
        Não há productos em Promução...
        </h3>`;
    }
  }
  function renderProducts(){
    let countp=0;
    containerOfortDay.innerHTML="";
    containerProducts.innerHTML="";
    products.forEach((element)=>{
      if(element.status){
        let newCard=`
      <div class="card descendo">
        <div class="cont-img">
          <img src="${element.imageProduct}" alt="produto-${element.id+1}">
          <div class="percentage" id="porcent">${element.porcent}%</div>
        </div>
        <h3 class="preco">A0A ${element.priceNew}.00</h3>
        <del class="text-riscado">A0A ${element.price}.00</del>
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
      }else{
        if(countp!==18){
          let newCard=`
        <div class="card subindo">
          <div class="cont-img">
            <img src="${element.imageProduct}" alt="produto-${element.id+1}">
            <!--<div class="percentage" id="porcent">60%</div>-->
          </div>
          <h3 class="preco">A0A ${element.price}.00</h3>
          <!--<del class="text-riscado">A0A${element.price}</del>-->
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
      }

    });

  }
  function initFetchService(){
    fetch('../services.json')
    .then(response=>response.json())
    .then(data=>{
      const contentServ=document.getElementById('content-service');
      // console.log(contentServ);
      for(let service of data) {
        if(service.type.includes("Combo Serviços")){
          const combo=contentServ.querySelector('#combo');
          combo.querySelector('h3').textContent=service.type;
          combo.querySelector('span').textContent='A0A '+ service.valor.toFixed(2);
          combo.querySelector('p').textContent=service.description;
          combo.querySelector('.btn').onclick=()=>{
            goingForReserva(service);
          };
        }

        if(service.type.includes("Massagem Simples")){
          const massagem=contentServ.querySelector('#massagem');
          massagem.querySelector('h3').textContent=service.type;
          massagem.querySelector('span').textContent='A0A '+ service.valor.toFixed(2);
          massagem.querySelector('p').textContent=service.description;
          massagem.querySelector('.btn').onclick=()=>{
            goingForReserva(service);
          };
        }

        if(service.type.includes("Limpeza Facial")){
          const facelimpa=contentServ.querySelector('#facelimpa');
          facelimpa.querySelector('h3').textContent=service.type;
          facelimpa.querySelector('span').textContent='A0A '+ service.valor.toFixed(2);
          facelimpa.querySelector('p').textContent=service.description;
          facelimpa.querySelector('.btn').onclick=()=>{
            goingForReserva(service);
          };
        }

        
      }
    })
  }
  function goingForReserva(service){
    sessionStorage.setItem('info-reserva',JSON.stringify(service));
    window.location.href="../pages-logado/fazer-reserva.html";
  }
  function seeIfUserFirstTimes(){
   return JSON.parse(sessionStorage.getItem('User_first_times'));
  }

  function initWorkIfUserLoginFirstTimes(){
    const users=JSON.parse(localStorage.getItem("BD_Users"))??[];
    const index=1+JSON.parse(sessionStorage.getItem("Id_users"))||'';

    const modalWrapperEditPerfil=document.querySelector(' .modal-wrapper-edit-perfil ');
    modalWrapperEditPerfil.classList.add('show-modal-edit');
    const form=modalWrapperEditPerfil.querySelector('.modal-edit-perfil > form');
  
    form.querySelector(' .wrapper-input > #name-user').value=users[index-1].userName;
    form.querySelector('.wrapper-input > #email-user').value=users[index-1].email;

    const inputNumberUser= form.querySelector('.wrapper-input > #number-user');
    const inputDateBorn=form.querySelector('.wrapper-input > #born-date-user');
    const inputGenere= form.querySelector('.wrapper-input > #genere-user');
    const loader= form.querySelector('#salve-data-user > .loader');

    function validatyFields(){
      let number=inputNumberUser.value.trim();
      let dateBorn= inputDateBorn.value.trim();
      let genere=inputGenere.value.trim();

      if(number===""){
        setError(inputNumberUser,'Campo obrigário');
        return
      }else if(!isNumberA0(number)){
        setError(inputNumberUser,'Não é um número angolano valido, Ex:932343465');
        return
      }else{
        setSucess(inputNumberUser);
      }

      if(dateBorn===""){
        setError(inputDateBorn,'O campo é obrigátrio');
        return
      }else{
        setSucess(inputDateBorn);
      }

      if(genere===""){
        setError(inputGenere,'O campo é obrigatório');
        return
      }else{
        setSucess(inputGenere);
      }

      return true
    }

    function saveStorage(){
      localStorage.setItem('BD_Users',JSON.stringify(users));
    }

    function salveDateUser(){
      loader.classList.add('show-loader');
      setTimeout(()=>{
        loader.classList.remove('show-loader');
        users[index-1].phoneNumber=inputNumberUser.value;
        users[index-1].bornData=inputDateBorn.value;
        users[index-1].genere=inputGenere.value;
        saveStorage();
        modalWrapperEditPerfil.classList.remove('show-modal-edit');
        sessionStorage.removeItem('User_first_times');
        Modal.open('../assets/imagens/icons8_ok.ico','Dados do perfil concluido!');
      },2000);

    }

    form.addEventListener('submit',function(event){
      event.preventDefault();
      if(validatyFields()){
        salveDateUser();
      }
    });
  }
  
  containerOfortDay.innerHTML=`
  <div style="width:90vw;text-align:center;"> 
    <img src="../assets/imagens/init-loading.gif" alt="icone de loading"></img>
  </div>`;
  containerProducts.innerHTML=`
  <div style="width:90vw;text-align:center;"> 
    <img src="../assets/imagens/init-loading.gif" alt="icone de loading"></img>
  </div>`;
//functions execute
setTimeout(()=>{
  renderProducts();
  initCountDown();
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
  initFetchService();

  if(seeIfUserFirstTimes()){
    initWorkIfUserLoginFirstTimes();
  }
})




