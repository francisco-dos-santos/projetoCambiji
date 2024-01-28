import {openCart, iconCart,handleClicksButtons} from "./workCart.js";
import {addNameUser} from"./workheaderLogado.js";
import { Modal } from "./modal.js";

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
  Modal.open("","já existe usário com esse email digite outro");
})