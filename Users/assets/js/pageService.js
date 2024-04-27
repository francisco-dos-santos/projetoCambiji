import {openCart, iconCart,initWorkCartPage} from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";



function initFetchService(){
  fetch('../services.json')
  .then(response=>response.json())
  .then(data=>{
    const contentServ=document.querySelector('.fundo-serv> .pagina-serv');
    console.log(contentServ);
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
})