
import {addNameUser} from"./workheaderLogado.js";
import{setError,setSucess,isNumberA0,isData,isValueCVV,isnumberCard,setErrorInTwoInputs,setSucessInTwoInputs}from "./funtctionValidatyForm.js";
import { initWorkCartPage,DataShopping,Total} from "./workCart.js";
import { handleScreensToShowShopping } from "./toggles.js";
import { Modal } from "./modal.js";

const btncheckedCard=document.getElementById('btn-cheked-card');
const finallyCheckoutShopping=document.getElementById('finesh-checkout');

const nameCard=document.getElementById('name-card');
const numberCard=document.getElementById('number-card');
const dataExperation=document.getElementById('data-experição');
const numberCVV=document.getElementById('number-cvv');
const numberPhoneMoney=document.getElementById('number-mobilemoney');

const phoneNumberUser=document.getElementById('phone-number');
const countryUser=document.getElementById('country');
const provinceUser=document.getElementById('province');
const cityUser=document.getElementById('cidade');
const adressUser=document.getElementById('home-adress');


function checkIpuntsCardPay(){
  let nameCardValue = nameCard.value.trim();
  let numberCardValue = numberCard.value.trim();
  let dataExperationValue = dataExperation.value.trim();
  let numberCVVValue = numberCVV.value.trim();
  

  if(nameCardValue === "") {
    setError(nameCard, "O nome do titular da conta é obrigatório!");
    return
  }else{
    setSucess(nameCard);
  }

  if(numberCardValue === "") {
    setError(numberCard, "O número do cartão é obrigatório!");
    return
  } else if(!isnumberCard(numberCardValue)) {
    setError(numberCard, " Não é um número valido de cartão de credito, de até 16 digitos!");
    return
  } else {
    setSucess(numberCard);
  }

  if(dataExperationValue === "") {
    setErrorInTwoInputs(dataExperation, "A data de vencimento do cartão é obrigatório");
    return 
  } else if(numberCVVValue === "") {
    setErrorInTwoInputs(numberCVV, "Error CVV vazio");
    return;
  } else if(!isData(dataExperationValue)) {
    setErrorInTwoInputs(dataExperation, 'Data inválida, digite data como: 02/06/2025');
    return
  } else if(!isValueCVV(numberCVVValue)) {
    setErrorInTwoInputs(numberCVV, "Error CVV inválido");
    return
  } else {
    setSucessInTwoInputs(dataExperation);
    setSucessInTwoInputs(numberCVV);
  }

  // Retorna apenas se control for verdadeiro
  return true;
}
function checkInputsCardPayMoney(){
  let nameCardValue = nameCard.value.trim(); 
  let numberPhoneMoneyValue = numberPhoneMoney.value.trim();

  if(nameCardValue === "") {
    setError(nameCard, "O nome do titular da conta é obrigatório!");
    return;
  } else {
    setSucess(nameCard);
  }

  if(numberPhoneMoneyValue === "") {
    setError(numberPhoneMoney, ' O número de telefone da conta money é obrigatório'); 
    return;
  } else if(!isNumberA0(numberPhoneMoneyValue)) {
    setError(numberPhoneMoney, 'Não é um número angolano válido, Ex: 913...786');
    return
  } else{
    setSucess(numberPhoneMoney);
  }
  return true
}

function checkeInputsAdressShopping(){
  let phoneNumberUserValue=phoneNumberUser.value.trim();
  let provinceUserValue=provinceUser.value.trim();
  let cityUserValue=cityUser.value.trim();
  let adressUserValue=adressUser.value.trim();

  if(phoneNumberUserValue==""){
    setError(phoneNumberUser,'O telemovel é obrigatório');
    return;
  }else if(!isNumberA0(phoneNumberUserValue)){
    setError(phoneNumberUser,'Não é um número angolano valido, Ex:912...234');
    return;
  }else{
    setSucess(phoneNumberUser);
  }

  if(provinceUserValue==""){
    setError(provinceUser,'A provincia é obrigatório');
    return;
  }else{
    setSucess(provinceUser);
  }

  if(cityUserValue==""){
    setError(cityUser,'A cidade ou municipio é obrigatório');
    return;
  }else{
    setSucess(cityUser)
  }

  if(adressUserValue==""){
    setError(adressUser,'O Enderenço é obrigatório');
    return;
  }else{
    setSucess(adressUser);
  }

  return true;
}
function selectTypePayments(){
  const InptusTypePayments= document.querySelectorAll('.wrapper-card input');
  const Wrapperinputpays=document.querySelectorAll('.wrapper-input.card-pay');
  const WrapperinputMobileMoney=document.querySelector('.wrapper-input.mobileMoney');
  InptusTypePayments.forEach(element=>{
    element.addEventListener('change',(event)=>{
      if(event.target.value=="UnitelMoney" || event.target.value=="AfriMoney"){
        Wrapperinputpays.forEach((element)=>{
          element.style.display='none';
          WrapperinputMobileMoney.style.display='block';
        })
      }else{
        Wrapperinputpays.forEach((element)=>{
          element.style.display='block';
          WrapperinputMobileMoney.style.display='none';
        })
      }
    })
  })
  // console.log(InptusTypePayments);
  // console.log(Wrapperinputpays, WrapperinputMobileMoney);
}
function clearInputs({input1,input2,input3,input4,input5}){
 input1.value="";
 input2.value="";
 input3.value="";
 input4.value="";
 input5.value=""
}
function renderListProductForCheckout(){
  const containerListProductForCheckout=document.querySelector('.screen-2 ul.list-product-for-checkeout');
  let carts=JSON.parse(sessionStorage.getItem('BD_carts'))??[];
  containerListProductForCheckout.innerHTML="";
  carts.forEach((element)=>{
    let newLi=`
      <li>
      <h5>${element.product}</h5>
      <small>descrição...</small>
      <p class="price-list-for-checkout">${element.price}kz</p>
      <p>
        <span class="quantity-list-for-checkout">${element.quantity}x</span>
        <span>${element.quantity*element.price}kz</span>
      </p>
      </li>
    `;
    containerListProductForCheckout.innerHTML+=newLi;
  });
}

function getPayment() {
  return new Promise((resolve, reject) => {
    let payment = undefined;
    const InptusTypePayments = document.querySelectorAll('.wrapper-card input');
    InptusTypePayments.forEach(element => {
        if(element.checked){
          payment = element.value;
          resolve(payment);
        }
    });
  });
}

btncheckedCard.addEventListener('click', (event) => {
  event.preventDefault();
  setTimeout(() =>{
    if (checkIpuntsCardPay() || checkInputsCardPayMoney()){
      clearInputs({
        input1: nameCard,
        input2: numberCard,
        input3: dataExperation,
        input4: numberPhoneMoney,
        input5: numberCVV
      });
      handleScreensToShowShopping();
      console.log('validou para fazer checking');
    } else {
      console.warn('não validou para fazer checking');
    }
  }, 100);
  
});

finallyCheckoutShopping.addEventListener('click',()=>{
  setTimeout(()=>{
    if(checkeInputsAdressShopping()){
      getPayment().then(payment =>{
        DataShopping.addShoppings({
          numberPhone:phoneNumberUser.value,
          province:provinceUser.value,
          municipe:cityUser.value,
          adress:adressUser.value,
          payment:payment,
          valor:Total
        });
        Modal.open('../assets/imagens/icons8_ok.ico','Compra efituado com sucesso!');
        // console.log(payment);
        handleScreensToShowShopping();
        window.location.href="../pages-logado/dataToshopping.html";
      });
      console.log('validou para finalizar compra');
    }else{
      console.warn('não validou para finalizar compra ');
    }
  },100);
});


document.addEventListener("DOMContentLoaded", function(){
  addNameUser();
  initWorkCartPage();
  selectTypePayments();
  renderListProductForCheckout();
  
});
