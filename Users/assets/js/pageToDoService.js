console.log("testando");
import {openCart, iconCart,handleClicksButtons,goFinallyShopping} from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";

const phoneNumber=document.getElementById("number-reserv");
const dataReserv=document.getElementById("data-reserv");
const hourReserv=document.getElementById("hour-reserv");
const payMetod=document.getElementById("pay-metod");
const typeService=document.getElementById("type-service");
const btnReserv=document.getElementById("btn-encomenda");

function Service(number,data,hour,pay,type){
  this.number=number,
  this.data=data,
  this.hour=hour,
  this.pay=pay,
  this.types=type 
}

const toDoReserv={
  List:JSON.parse(localStorage.getItem("BD_Service"))||[],
  seeQuantity:function(){
    let reVal=false;
    this.List.forEach(element=>{
      if(element.types.length>=3){
        return reVal=true;
      }
    });
    reVal;
  },
  setService:function(number,data,hour,pay,type){
    if(number=="" && data=="" && hour==""){
      alert("erro Campos vazio");
    }else if(this.seeQuantity()){
      alert("esgotaste o limite de reservas");
    }
    else{
      this.List.push(new Service(number,data,hour,pay,type));
      console.log(this.List);
      this.saveStorage();
    }
  },
  saveStorage:function(){
    localStorage.setItem("BD_Service",JSON.stringify(this.List))
  }


}
btnReserv.addEventListener("click", ()=>{
  let number=phoneNumber.value.trim();
  let data=dataReserv.value;
  let hour=hourReserv.value;
  let pay=payMetod.value;
  let type=typeService.value;
  toDoReserv.setService(number,data,hour,pay,type);
});


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
  handleClicksButtons();
  goFinallyShopping();
})


