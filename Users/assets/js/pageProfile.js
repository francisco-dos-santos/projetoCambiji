import { addNameUser } from "./workheaderLogado.js";
import { handleScreensEditProfile} from "./toggles.js";
import { Modal,ConfirmModal } from "./modal.js";
import Countdown  from "./countdown.js";
import {GerinceService} from "./pageToDoService.js";
import { initWorkCartPage,openCart,iconCart } from "./workCart.js";
import { setSucess,setError,ismail,isNumberA0 } from "./funtctionValidatyForm.js";

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
      contentImage.src=item.imageProduct;
      ItemShopping.querySelector('.info-product span:first-child').innerText=item.product;
      ItemShopping.querySelector('.info-product span:last-child').innerText="Categoria: "+item.category;
      ItemShopping.querySelector('.price-item').innerText="A0A "+item.price +" X"+item.quantity+' ->';
      ItemShopping.querySelector('.code').textContent=shopping.codeverify;
      ItemShopping.querySelector('.sub-total').textContent="A0A "+(item.price*item.quantity).toFixed(2);
      ItemShopping.querySelector('.payment').textContent=shopping.payment;

      if(shopping.status){
        ItemShopping.querySelector('.status').textContent='Concluido';
        ItemShopping.querySelector('.status').style.color="aqua";
        ItemShopping.querySelector('.status').style.borderColor="aqua";
      }

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

function seeUserDoneShoppings(){
  if(JSON.parse(sessionStorage.getItem('see-shoppigs'))){
    document.querySelectorAll('.list-navbar li button')[1].click();
    sessionStorage.removeItem('see-shoppigs');
  }
}
seeUserDoneShoppings();
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
  function seeUserDoneReserva(){
    if(JSON.parse(sessionStorage.getItem('gotPerfilServ'))){
      document.querySelectorAll('.list-navbar li button')[2].click();
      Modal.open(
        "../assets/imagens/icons8_ok.ico",
        'Serviço Reservado com sucesso'
      );
      sessionStorage.removeItem('gotPerfilServ');
    }
  }
  class ExtendServForDelAndRender extends GerinceService
  {
    constructor(){
      super('');
      this.renderService();
    }
    getTimeForDateService(futureDate){
      let countdown=new Countdown({futureDate:futureDate});
      return countdown;
    }
    
    delete(id){
      this.users[this.index-1].Services.splice(id,1);
      this.saveStorage();
      this.renderService();
      setTimeout(()=>{
        Modal.open(
          "../assets/imagens/icons8_ok.ico",
          'Serviço Cancelado com sucesso!'
        );
      },400)
    }

    renderService(){
      let containerBodyTable=document.querySelector('table tbody.body-table');
      this.removeAllTr();
      if(this.users[this.index-1].Services && this.users[this.index-1].Services.length){
      for(let service of this.users[this.index-1].Services){
        const row=this.createTr();
        let dates= service.data.split('/');
        let hours=service.hour.replaceAll('h',':').split(':');

        let futureDate= new Date(dates[2],dates[1]-1,dates[0], hours[0],hours[1],59);
        
        row.querySelector('span.td-type').textContent=service.type;
        row.querySelector('span.td-valor').textContent=service.valor;
        row.querySelector('span.td-date').textContent=service.data+' «» '+service.hour;
        row.querySelector('span.td-pay').textContent=service.pay;
        row.querySelector('span.td-code').textContent=service.codeverify;
        row.querySelector('span.td-status').textContent=service.status?'Concluido':'Pendente';
        if(service.status){
          row.querySelector("td .td-status").style.color="aqua";
          row.querySelector('td .td-status').style.borderColor="aqua";
        }
        row.querySelector('.content-td-action #cancel').onclick= async()=>{
          let id=this.users[this.index-1].Services.indexOf(service);
          let isOk=await ConfirmModal.open('Desejas Canselar o serviço ?');
          if(isOk){
            this.delete(id);
          }
        }
        let cronoment=row.querySelector('.content-td-action .countdown-profile');
       
        let count=setInterval(getcoutdowm,1000);

        function getcoutdowm(){
          let timeStemp=new Countdown({futureDate:futureDate});
          cronoment.textContent=
          `${String(timeStemp.total.days).padStart(2,'0')}d:
            ${String(timeStemp.total.hours).padStart(2,'0')}h:
            ${String(timeStemp.total.minutes).padStart(2,'0')}:
            ${String(timeStemp.total.seconds).padStart(2,'0')}
          `;

          if(timeStemp.isTimeDiffEqualZero){
            clearInterval(count);
            cronoment.textContent='0d:00h:00:00';
            row.querySelector('.content-td-action #cancel').style.display='none';
          }
        }

        containerBodyTable.append(row);
      }

      }else{
      const tr=document.createElement('tr');
      const td= document.createElement('td');
      const texto=document.createTextNode('Estas sem Serviços efeituados');
      tr.appendChild(td);
      td.appendChild(texto);
      td.setAttribute('colspan','6');
      td.style.textAlign="center";
      containerBodyTable.appendChild(tr);
      }
    }

    createTr(){
      let tr=document.createElement('tr');

      tr.innerHTML=`
        <td><span class="td-type"></span></td>
        <td><span class="td-valor"></span></td>
        <td><span class="td-date"></span></td>
        <td><span class="td-code"></span></td>
        <td><span class="td-pay"></span></td>
        <td><span class="td-status"></span></td>
        <td class="content-td-action">
          <div class="btn-action-main">
            •••
              <div class="content-actions-btn">
                <button id="see">Ver</button>
                <button id="cancel">Cancelar</button>
              </div>
          </div>
          <div class="countdown-profile">
          </div>
        </td>
      `;
      return tr;
    }
    removeAllTr(){
      document.querySelectorAll('table tbody tr').forEach(tr=>tr.remove());
    }
  }

  new ExtendServForDelAndRender();
  seeUserDoneReserva();
  // console.log(service);
}

//fuctions utilits
function saveStorage(){
  localStorage.setItem('BD_Users',JSON.stringify(users));
}
function validarFieldsObrigators(){
  const inputEditName=document.getElementById('edit-name-user');
  const inputEditEmail=document.getElementById('edit-email-user');
  const inputEditPhone=document.getElementById('edit-phone-user');

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

  if(inputEditPhone.value===""){
    setError(inputEditPhone,'O número é obrigatório');
    return
  }else if(!isNumberA0(inputEditPhone.value)){
    setError(inputEditPhone,'Dogite um número valido de angola, ex:934545544');
    return
  }else{
    setSucess(inputEditPhone);
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