import { addNameUser } from "./workheaderLogado.js";
import { handleScreensEditProfile} from "./toggles.js";
import { Modal } from "./modal.js";
import Countdown  from "./countdown.js";
import {GerinceService} from "./pageToDoService.js";
import { initWorkCartPage,openCart,iconCart } from "./workCart.js";
import { setSucess,setError,ismail } from "./funtctionValidatyForm.js";
const users=JSON.parse(localStorage.getItem("BD_Users"))??[];
const index=1+JSON.parse(sessionStorage.getItem("Id_users"))||'';

// functions
function initTabProfile(){
  const tabsButton= document.querySelectorAll('.list-navbar li button');
function tabclicked(tab){
  const contents=document.querySelectorAll('.zone-content .content');
  contents.forEach(content=>content.classList.remove('show'));
  tabsButton.forEach(tab=>tab.classList.remove('activo'));
  const contentId=tab.getAttribute('content-id');
  const contentTarget= document.getElementById(contentId)
  if(contentTarget){
    tab.classList.add('activo');
    setTimeout(()=>{contentTarget.classList.add('show')},500);
  }
}
// events
tabsButton.forEach(tab=>{
  tab.addEventListener('click',()=>{
    tabclicked(tab);
  });
});
};
function initRenderShoppingUser(){
  const containerShoppings=document.querySelector('.container-shopping-user');
  const template= document.querySelector('.container-shopping-user template');
if(users[index-1].shoppings!==undefined){
  containerShoppings.innerHTML="";
  for (let shopping of users[index-1].shoppings){
    for (let item of shopping.products){
      const ItemShopping=template.content.cloneNode(true);
      let contentImage=ItemShopping.querySelector('.content-item-img img');
      contentImage.src="../assets/"+item.imageProduct;
      ItemShopping.querySelector('.info-product span:first-child').innerText=item.product;
      ItemShopping.querySelector('.info-product span:last-child').innerText="Categoria: "+item.category;
      ItemShopping.querySelector('.price-item').innerText="A0 "+item.price +" X"+item.quantity+' ->';

      ItemShopping.querySelector('.sub-total').textContent="A0 "+item.price*item.quantity;
      ItemShopping.querySelector('.payment').textContent=shopping.payment;
      containerShoppings.appendChild(ItemShopping);
    }
    containerShoppings.innerHTML+=`
      <div class="separator-shoppings">
      <p>${shopping.date}&nbsp;/&nbsp;${shopping.time.replace(':','h')}</p>
      <p>Valor: A0 ${shopping.valor}</p>
      </div>
    `;
  }
}else{
  const h3=document.createElement('h3');
  const texto=document.createTextNode('Estas sem Compras efeituadas!');
  h3.appendChild(texto);
  h3.style.textAlign="center";
  containerShoppings.appendChild(h3);
}
  
}
function initWorkProfileUser(){
  const btnAlterData=document.querySelector('.screen-1 #alter-user');
  const btnSalveData=document.querySelector('.screen-2 #salva-data-user');
  const btnAlterPass=document.querySelector('.wrapper-data-private #alter-pass-user');

  const inputEditName=document.getElementById('edit-name-user');
  const inputEditEmail=document.getElementById('edit-email-user');
  const inputEditBio=document.getElementById('edit-bio-user');
  const inputEditPhone=document.getElementById('edit-phone-user');
  const inputEditDataBorn=document.getElementById('edit-born-data-user');
  const inputEditgenere=document.getElementById('edit-genere-user');


  btnAlterData.addEventListener('click',function(){
    if(Boolean(btnSalveData)){
      handleScreensEditProfile();
    }
  });

  inputEditName.value=users[index-1].userName;
  inputEditEmail.value=users[index-1].email;

  if(users[index-1].biografia!==undefined){
    inputEditBio.value=users[index-1].biografia;
  }

  if(users[index-1].phoneNumber!==undefined){
    inputEditPhone.value=users[index-1].phoneNumber;
  }

  if(users[index-1].bornData!==undefined){
    inputEditDataBorn.value=users[index-1].bornData;
  }

  if(users[index-1].genere!==undefined){
    inputEditgenere.value=users[index-1].genere;
  }

  btnSalveData.addEventListener('click',()=>{
    if(validarFieldsObrigators()){
      users[index-1].userName= inputEditName.value;
      users[index-1].email= inputEditEmail.value;
      users[index-1].biografia= inputEditBio.value;
      users[index-1].phoneNumber= inputEditPhone.value;
      users[index-1].bornData= inputEditDataBorn.value;
      users[index-1].genere= inputEditgenere.value;
      saveStorage();
      Modal.open('../assets/imagens/icons8_ok.ico','Dados alterrado com sucesso!');
      getDataProfile();
      handleScreensEditProfile();
      addNameUser();
    }else{
      console.warn('error campos obritório não preenchido')
    }
  });
  
}
function initworkProfileServiveUser(){
  class ExtendServForDelAndRender extends GerinceService
  {
    constructor(){
      super('');
      this.renderService();
    }
    getTimeForDateService(futureDate){
      let countdown=new Countdown({futureDate:futureDate});
      if(countdown.isTimeDiffEqualZero){
        return;
      }
      return countdown;
    }

    renderService(){
      let containerBodyTable=document.querySelector('table tbody.body-table');
    if(this.users[this.index-1].Services && this.users[this.index-1].Services.length){
      containerBodyTable.innerHTML="";
      for(let service of this.users[this.index-1].Services){
        let futureDate=`${service.data} ${service.hour}`;
        
        let newlistServ=`
        <tr>
          <td><span>${service.type}</span></td>
          <td><span>${service.valor}</span></td>
          <td><span>${service.data}</span></td>
          <td><span>${service.hour}</span></td>
          <td><span class="td-pay">${service.pay}</span></td>
          <td><span class="td-status">Em process</span></td>
          <td class="content-td-action">
            <div class="btn-action-main">
              •••
                <div class="content-actions-btn">
                  <button>Ver</button>
                  <button>Cancelar</button>
                </div>
            </div>
            <div class="countdown-profile">
            ${String(this.getTimeForDateService(futureDate).total.days).padStart(2,'0')}d:
            ${String(this.getTimeForDateService(futureDate).total.hours).padStart(2,'0')}h:
            ${String(this.getTimeForDateService(futureDate).total.minutes).padStart(2,'0')}:
            ${String(this.getTimeForDateService(futureDate).total.seconds).padStart(2,'0')}
            </div>
          </td>
        </tr>
        `;
        containerBodyTable.innerHTML+=newlistServ;

      }

      
      //   let btnCancelar= countdownText.previousElementSibling.querySelector('.content-actions-btn button:last-child');

      }else{
      const tr=document.createElement('tr');
      const td= document.createElement('td');
      const texto=document.createTextNode('Estas sem Serviços efeituados');
      tr.appendChild(td);
      td.appendChild(texto);
      td.style.textAlign="center";
      td.style.columnFill="5";
      containerBodyTable.appendChild(tr);
      }
    }
  }

  new ExtendServForDelAndRender();
  // console.log(service);
}

//fuctions utilits
function saveStorage(){
  localStorage.setItem('BD_Users',JSON.stringify(users));
}
function validarFieldsObrigators(){
  const inputEditName=document.getElementById('edit-name-user');
  const inputEditEmail=document.getElementById('edit-email-user');

  if(inputEditName.value==""){
    setError(inputEditName,'O nome é obrigatório');
    return
  }else{
    setSucess(inputEditName);
  }

  if(inputEditEmail.value===""){
    setError(inputEditEmail,'O email é obrigatório');
    return
  }else if(!ismail(inputEditEmail.value)){
    setError(inputEditEmail,'Não é um email valido ex:francisco@gmail.com');
    return
  }else{
    setSucess(inputEditEmail);
  }

  return true;
}
function getDataProfile(){
  const name=document.getElementById('name-user');
  const Email=document.getElementById('email-user');
  const bio=document.getElementById('bio-user');
  const phone=document.getElementById('phone-user');
  const dataBorn=document.getElementById('born-data-user');
  const genere=document.getElementById('genere-user');

  name.value=users[index-1].userName;
  Email.value=users[index-1].email;

  if(users[index-1].biografia!==undefined){
    bio.innerText=users[index-1].biografia;
  }

  if(users[index-1].phoneNumber!==undefined){
    phone.value=users[index-1].phoneNumber;
  }

  if(users[index-1].bornData!==undefined){
    dataBorn.value=users[index-1].bornData;
  }

  if(users[index-1].genere!==undefined){
    genere.value=users[index-1].genere;
  }

}

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




document.addEventListener('DOMContentLoaded',()=>{
  addNameUser();
  initTabProfile();
  initRenderShoppingUser();
  initWorkProfileUser();
  initworkProfileServiveUser();
  initWorkCartPage();
  getDataProfile();
})