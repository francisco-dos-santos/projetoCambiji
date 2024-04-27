
import { openCart, iconCart, initWorkCartPage } from "./workCart.js";
import { addNameUser } from "./workheaderLogado.js";
import { Modal } from "./modal.js";
import{setError,setSucess,isNumberA0,isData,isValueCVV,isnumberCard,setErrorInTwoInputs,setSucessInTwoInputs}from "./funtctionValidatyForm.js";


const users = JSON.parse(localStorage.getItem("BD_Users")) ?? [];
const index = 1 + JSON.parse(sessionStorage.getItem("Id_users")) || "";

const btnReserv = document.getElementById("btn-cheked-card");
const phoneNumber = document.getElementById("number-reserv");
const dataReserv = document.getElementById("data-reserv");
const hourReserv = document.getElementById("hour-reserv");
const typeService = document.getElementById("type-service");

const nameCard=document.getElementById('name-card');
const numberCard=document.getElementById('number-card');
const dataExperation=document.getElementById('data-experição');
const numberCVV=document.getElementById('number-cvv');
const numberPhoneMoney=document.getElementById('number-mobilemoney');

console.log("testando");

class Service{
    constructor({
    number,
    data,
    hour,
    pay,
    type,
    valor,
    durection,
    description,
    codeverify
  }) {
    this.number = number;
    this.data = new Date(data).toLocaleDateString();
    this.hour = hour;
    this.pay = pay;
    this.type = type;
    this.valor = valor;
    this.codeverify=codeverify;
    this.status = false;
    this.durection = durection;
    this.description = description;
    this.datanow = `${String(this._Data.getDate()).padStart(2, "0")}/${String(
      this._Data.getMonth() + 1
    ).padStart(2, "0")}/${this._Data.getFullYear()}`;
    this.hournow = `${String(this._Data.getHours()).padStart(2, "0")}:${String(
      this._Data.getMinutes()
    ).padStart(2, "0")}`;
  }
  get _Data() {
    return new Date();
  }
};

export class GerinceService {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("BD_Users")) ?? [];
    this.index = 1 + JSON.parse(sessionStorage.getItem("Id_users")) || "";
    this.List = new Object();
  }
  add({ number, data, hour, pay, type, valor, durection, description }) {
    this.List = new Service({
      number,
      data,
      hour,
      pay,
      type,
      valor,
      durection,
      description,
      codeverify:this.codeRandom
    });
    const currentUser = this.users[this.index - 1];
    currentUser.Services = currentUser.Services || [];
    currentUser.Services.push(this.List);
    this.saveStorage();
    setTimeout(()=>{
      sessionStorage.setItem('gotPerfilServ',JSON.stringify(true));
      window.location.href="../pages-logado/perfil.html";      
    },300);
  }
  saveStorage() {
    localStorage.setItem("BD_Users", JSON.stringify(this.users));
  }
  get codeRandom(){
    let code="";
    let letters='abcdefghijklmlpqrstvwxyz';
    let special='@$&%#';
    let number='0123456789'; 
    for(let i=0; i<4;i++){
      code+=letters[Math.floor(Math.random()* letters.length)]+
      special[Math.floor(Math.random()* special.length)]+
      number[Math.floor(Math.random()* number.length)];
    }
    return code;
  }
}
//functions
function initValidateFields(){
  let NumberValue = phoneNumber.value.trim();
  let dReservValue = dataReserv.value.trim();
  let hReservValue = hourReserv.value.trim();

  let dateAtual = new Date().getTime();
  let isDatePassed = new Date(dReservValue).getTime() <=dateAtual;

  if (NumberValue === "") {
    setError(phoneNumber, "O campo é obrigatório");
    return;
  } else if (!isNumberA0(NumberValue)) {
    setError(phoneNumber, "Não é um número valido de angola EX:932454534");
    return;
  } else {
    setSucess(phoneNumber);
  }

  if (dReservValue === "") {
    setError(dataReserv, "A data é obrigatório");
    return;
  } else if (isDatePassed) {
    setError(dataReserv, "A data é vencida digite data valida");
    return;
  } else {
    setSucess(dataReserv);
  }

  if(hReservValue === "") {
    setError(hourReserv, "A hora é obrigatório");
    return;
  } else {
    setSucess(hourReserv);
  }

  return true;
}
function checkIpuntsCardPay(){
  let nameCardValue = nameCard.value.trim();
  let numberCardValue = numberCard.value.trim();
  let dataExperationValue = dataExperation.value.trim();
  let numberCVVValue = numberCVV.value.trim();
  

  if(nameCardValue === "") {
    setError(nameCard, "O nome da conta é obrigatório!");
    return
  }else{
    setSucess(nameCard);
  }

  if(numberCardValue === "") {
    setError(numberCard, "O número do cartão é obrigatório!");
    return
  } else if(!isnumberCard(numberCardValue)) {
    setError(numberCard, " Não é um número valido de cartão de credito, digita até 16 digitos!");
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

  if(nameCardValue === ""){
    setError(nameCard, "O nome da conta é obrigatório!");
    return;
  } else {
    setSucess(nameCard);
  }

  if(numberPhoneMoneyValue === "") {
    setError(numberPhoneMoney, ' O número da conta money é obrigatório'); 
    return;
  } else if(!isNumberA0(numberPhoneMoneyValue)) {
    setError(numberPhoneMoney, 'Não é um número angolano válido, Ex: 913...786');
    return
  } else{
    setSucess(numberPhoneMoney);
  }
  return true
}
function setInfoOfReserva(service){
  const wrapperImage=document.querySelector('.wrapper-img');
  wrapperImage.querySelector('.name-serv').textContent=service.type;
  wrapperImage.querySelector('.durection-serv').textContent=service.durection;
  wrapperImage.querySelector('.price-serv').textContent=service.valor;
  wrapperImage.querySelector('img').setAttribute('src',"../assets/imagens/"+service.image);

  nameCard.value=users[index-1].userName;
  numberPhoneMoney.value=users[index-1].phoneNumber;
  phoneNumber.value = users[index - 1].phoneNumber;
  typeService.value=service.type;


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
function initReserveToService(){
  const service = JSON.parse(sessionStorage.getItem('info-reserva')) ?? "";
  const loader = btnReserv.querySelector('.loader');
  setInfoOfReserva(service);
  selectTypePayments();

  // dataReserv.addEventListener("change", function () {
  //   dataReservValue = this.value;
  // });
  // hourReserv.addEventListener("change", function () {
  //   hourReservValue = this.value;
  // });
  // phoneNumber.addEventListener("change", function () {
  //   phoneNumberValue = this.value;
  // });

  
  btnReserv.addEventListener("click", (event) =>{
    event.preventDefault();

    if(initValidateFields()){
      getPayment().then(payment=>{
        let gerinceService = new GerinceService();

        if(payment=="UnitelMoney" || payment=="AfriMoney"){
          if(checkInputsCardPayMoney()){
            loader.style.display='block';
            setTimeout(()=>{
              
              console.log(payment);

              gerinceService.add({
                data: dataReserv.value,
                hour: hourReserv.value,
                pay: payment,
                type: typeService.value,
                number: phoneNumber.value,
                valor: service.valor,
                durection:service.durection,
                description: service.description,
                });

              loader.style.display='none';
            },2000);

            sessionStorage.removeItem('info-reserva');
            console.log('validou para concluir reserva money');
          }else{
            console.warn('não validou para concluir reserva money');
          }

          return
        }

        if(checkIpuntsCardPay()){
          loader.style.display='block';
          setTimeout(()=>{
            console.log(payment);

            gerinceService.add({
              data: dataReserv.value,
              hour: hourReserv.value,
              pay: payment,
              type: typeService.value,
              number: phoneNumber.value,
              valor: service.valor,
              durection:service.durection,
              description: service.description,
            });
            
            loader.style.display='none';
          },2000);

          sessionStorage.removeItem('info-reserva');
          console.log('validou para concluir reserva com card');
        }else{
          console.warn('não validou para concluir reserva com card');
        }

  
      }); //fim promise      
      
    }else{
      console.warn("erro Campo Vazio de informações para reserva");
    }
  });
}

openCart.btncloseCart.addEventListener("click", () => {
  openCart.close();
});
iconCart.onmousemove = () => {
  openCart.open();
};

window.addEventListener("keydown", closeWidthESC);

function closeWidthESC(event) {
  if (event.key === "Escape") {
    openCart.close();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  addNameUser();
  initWorkCartPage();
  if(Boolean(btnReserv)) {
    initReserveToService();
  }
});
