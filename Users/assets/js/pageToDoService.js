console.log("testando");
import {openCart, iconCart,initWorkCartPage} from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";
import { Modal } from "./modal.js";
import { setError,setSucess,isNumberA0} from "./funtctionValidatyForm.js";
 
const btnReserv=document.getElementById("btn-encomenda");
const phoneNumber=document.getElementById("number-reserv");
const dataReserv=document.getElementById("data-reserv");
const hourReserv=document.getElementById("hour-reserv");
const payMetod=document.getElementById("pay-metod");
const typeService=document.getElementById("type-service");



const Services=[
  {
    type:'Combo Serviço',
    valor:20000,
    durection:'1:30',
    description:'Serviço de Limpeza da Facial e Massagem Corporal com produtos avaliados pelo departamento da saúde'
  },
  {
    type:'Massagem Simples',
    valor:8000,
    durection:'45min',
    description:'Serviço de massagem corporal com produtos avaliados pelo departamento da saúde'
  },
  {
    type:'Limpeza Facial',
    valor:8000,
    durection:'45min',
    description:'Serviço de Limpeza Facial com produtos avaliados pelo departamento da saúde'
  }
];

const Service = class {
    constructor({number,data,hour,pay,type,valor,durection,description}){
      this.number=number;
      this.data=data;
      this.hour=hour;
      this.pay=pay;
      this.type=type;
      this.valor=valor;
      this.durection=durection;
      this.description=description;
      this.datanow=`${String(this._Data.getDate()).padStart(2, '0')}/${String(this._Data.getMonth() + 1).padStart(2, '0')}/${this._Data.getFullYear()}`;
      this.hournow =`${String(this._Data.getHours()).padStart(2, '0')}:${String(this._Data.getMinutes()).padStart(2, '0')}`;
  }
  get _Data(){
    return new Date();
  }
};
class GerinceService{
  constructor(){
    this.users=JSON.parse(localStorage.getItem('BD_Users'))??[];
    this.index = 1 + JSON.parse(sessionStorage.getItem("Id_users")) || '';
    this.List=new Object();
  };
  add({number,data,hour,pay,type,valor,durection,description}){
    this.List=new Service(
      {
        number,
        data,
        hour,
        pay,
        type,
        valor,
        durection,
        description
      });
    const currentUser = this.users[this.index-1];
    currentUser.Services = currentUser.Services || [];
    currentUser.Services.push(this.List);
    this.saveStorage();
    this.atualizarList();
  };
  saveStorage(){
    localStorage.setItem("BD_Users",JSON.stringify(this.users))
  };
  atualizarList(){
    console.log(this.users[this.index-1].Services);
  }
}
export{GerinceService}
//functions
function initValidateFields(){
  let NumberValue = phoneNumber.value.trim();
  let dReservValue = dataReserv.value.trim();
  let hReservValue = hourReserv.value.trim();
  let MetodValue =payMetod.value.trim();
  let ServiceValue=typeService.value.trim();
  
  let dateAtual=new Date().getTime();
  let isDatePassed= new Date(dReservValue).getTime()< dateAtual;

  if(NumberValue===""){
    setError(phoneNumber,'O campo é obrigatório');
    return
  }else if(!isNumberA0(NumberValue)){
    setError(phoneNumber,'Não é um número valido de angola EX:932454534');
    return
  }else{
    setSucess(phoneNumber);
  }
    
  if(dReservValue===""){
    setError(dataReserv,'A data é obrigatório');
    return 
  }else if(isDatePassed){
    setError(dataReserv,'A data é vencida digite data valida');
  }else{
    setSucess(dataReserv);
  }

  if(hReservValue===""){
    setError(hourReserv,'A hora é obrigatório');
    return
  }else{
    setSucess(hourReserv);
  }
  
  if(MetodValue===""){
    setError(payMetod,'O Metodo é obrigatório');
    return
  }else{
    setSucess(payMetod);
  }

  if(ServiceValue===""){
    setError(typeService,'O tipo é obrigatório');
    return
  }else{
    setSucess(typeService);
  }

return true
};
function initReserveToService(){

  let phoneNumberValue ='';
  let dataReservValue ='';
  let hourReservValue ='';
  let payMetodValue ='';
  let typeServiceValue='';
  let valueService=0;
  let durection='';
  let description='';

  dataReserv.addEventListener("change",function(){dataReservValue= this.value;});
  hourReserv.addEventListener("change",function(){hourReservValue= this.value;});
  phoneNumber.addEventListener("change",function(){phoneNumberValue= this.value;});
  payMetod.addEventListener("change", function(){payMetodValue= this.value;});
  typeService.addEventListener("change", function(){typeServiceValue= this.value;});


  btnReserv.addEventListener('click',(event)=>{
    event.preventDefault();
    if(initValidateFields()){

      for(let item of Services) {
        if(item.type===typeServiceValue){
          valueService=item.valor;
          durection=item.durection;
          description=item.description;
          break;
        }
      }

      let gerinceService = new GerinceService();
      gerinceService.add(
      {
        data:dataReservValue,
        hour:hourReservValue,
        pay:payMetodValue,
        type:typeServiceValue,
        number:phoneNumberValue,
        valor:valueService,
        durection:durection,
        description:description
      });
      Modal.open('../assets/imagens/icons8_ok.ico','"/Serviço Reservado com sucesso!"/');
      phoneNumber.value='';
      hourReserv.value='';
      dataReserv.value=''
      payMetod.value='';
      typeService.value=''; 
  }else{
    console.warn('erro algum Campo Vazio');
  }
  });
}

openCart.btncloseCart.addEventListener('click',()=>{
  openCart.close();
});
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
  if(Boolean(btnReserv)){
    initReserveToService();
  }
})

