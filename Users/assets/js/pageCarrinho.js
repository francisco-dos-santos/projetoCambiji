// import {handleClicksButtons,renderShopping } from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";
import{setError,setSucess,isnumber,isNumberA0,isData,isValueCVV,isnumberCard,setErrorInTwoInputs,setSucessInTwoInputs}from "./funtctionValidatyForm.js";
import { initWorkCartPage } from "./workCart.js";
const btncheckedCard=document.getElementById('btn-cheked-card')
const nameCard=document.getElementById('name-card');
const numberCard=document.getElementById('number-card');
const dataExperation=document.getElementById('data-experição');
const numberCVV=document.getElementById('number-cvv');
const numberPhone=document.getElementById('number-mobilemoney');

function checkedCardshopping(){
  let nameCardValue=nameCard.value;
  let numberCardValue=numberCard.value;
  let dataExperationValue=dataExperation.value;
  let numberCVVValue=numberCVV.value;
  let numberPhoneValue=numberPhone.value;
  let control=false;
  if(nameCardValue==""){
    setError(nameCard,"Error selecione o cartão ai por cima!");
    return;
  }else{
    setSucess(nameCard);
  }

  if(numberCardValue==""){
    setError(numberCard,"Error digite o número do cartão!");
  }else if(!isnumberCard(numberCardValue)){
    setError(numberCard,"Error digite um número valido de cartão de credito até 16 digitos!")
  }else{
    setSucess(numberCard);
  }

  if(numberPhoneValue==""){
    setError(numberPhone,'Error digite o número de telefone da conta money');
  }else if(!isNumberA0(numberPhoneValue)){
    setError(numberPhone,'Error não é um número válido Angolano, Ex: 913...786')
  }else{
    setSucess(numberPhone)
    control=true;
  }
  
  if(dataExperationValue==""){
    setErrorInTwoInputs(dataExperation,"Error digite a data de vencimento do cartão");
  }else if(numberCVVValue==""){
    setErrorInTwoInputs(numberCVV,"Error CVV vazio")
  }else if(!isData(dataExperationValue)){
    setErrorInTwoInputs(dataExperation,'Error digite data valida como: 02/06/2025')
  }else if(!isValueCVV(numberCVVValue)){
    setErrorInTwoInputs(numberCVV,"Error CVV invalido");
  }
  else{
    setSucessInTwoInputs(dataExperation);
    setSucessInTwoInputs(numberCVV);
    return control=true;
  }
  return control;
}

function selectTypePayments(){
  const InptusTypePayments= document.querySelectorAll('.wrapper-card input');
  const Wrapperinputpays=document.querySelectorAll('.wrapper-input.card-pay');
  const WrapperinputMobileMoney=document.querySelector('.wrapper-input.mobileMoney');
  InptusTypePayments.forEach(element=>{
    element.addEventListener('change',(event)=>{
      nameCard.value=event.target.value;
      if(nameCard.value=="UnitelMoney" || nameCard.value=="AfriMoney"){
        Wrapperinputpays.forEach((element)=>{
          element.style.display='none';
        })
        WrapperinputMobileMoney.style.display='block';
      }else{
        Wrapperinputpays.forEach((element)=>{
          element.style.display='block';
        })
        WrapperinputMobileMoney.style.display='none';
      }
    })
  })
  console.log(InptusTypePayments);
  console.log(Wrapperinputpays, WrapperinputMobileMoney);
}

btncheckedCard.addEventListener('click',(event)=>{
  event.preventDefault();
  setTimeout(()=>{
    if(checkedCardshopping()){
      console.log('validou para enviar', checkedCardshopping());
    }
  },100);
});

document.addEventListener("DOMContentLoaded", function(){
  addNameUser();
  initWorkCartPage();
  selectTypePayments();
})