import { addNameUser } from "./workheaderLogado.js";
import { initWorkCartPage,openCart,iconCart } from "./workCart.js";

const tabsButton= document.querySelectorAll('.list-navbar li button');

// functions
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
})
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
  initWorkCartPage();
})