console.log("testando");
import {openCart, iconCart,initWorkCartPage} from "./workCart.js";
import {addNameUser ,index} from"./workheaderLogado.js";

 const Service = class {
  constructor({number,data,hour,pay,type}){
  this.number=number;
  this.data=data;
  this.hour=hour;
  this.pay=pay;
  this.type=type;
  this.id=index-1;
  }
}
class GerinceService{
  constructor(){
    this.List=JSON.parse(localStorage.getItem("BD_Service"))||[];
  };
  add({number,data,hour,pay,type}){
    if(number!==""&& data!==""&& hour!==""&& pay!=="" && type!==""){
      const newservice=new Service({number,data,hour,pay,type});
      this.List.push(newservice);
      this.saveStorage();
      this.atualizarList();
    }else{
      alert("um dos campos está vazio");
      return
    }
  };
  saveStorage(){
    localStorage.setItem("BD_Service",JSON.stringify(this.List))
  };
  atualizarList(){
    console.log(this.List);
  }
}
// events
document.addEventListener("DOMContentLoaded",function(){

  const btnReserv=document.getElementById("btn-encomenda");

  const phoneNumber=document.getElementById("number-reserv");
  const dataReserv=document.getElementById("data-reserv");
  const hourReserv=document.getElementById("hour-reserv");
  const payMetod=document.getElementById("pay-metod");
  const typeService=document.getElementById("type-service");
  
  const gerinceService=new GerinceService();
  btnReserv.addEventListener('click',()=>{
    console.log("clicado");
    let phoneNumberValue = phoneNumber.value;
    let dataReservValue = dataReserv.value;
    let hourReservValue = hourReserv.value;
    let payMetodValue = payMetod.value;
    let typeServiceValue = typeService.value;

    gerinceService.add({
      data: dataReservValue,
      hour: hourReservValue,
      pay: payMetodValue,
      type: typeServiceValue,
      number: phoneNumberValue
    });
  });
});

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
})

