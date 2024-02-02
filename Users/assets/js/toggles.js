export function eyestoggle(eye,senha){
  if(senha.type ==="password"){
    senha.setAttribute("type","text");
    eye.setAttribute("src","../assets/imagens/icons8_hide.ico")
  }else{
    senha.setAttribute("type","password");
    eye.setAttribute("src","../assets/imagens/icons8_eye.ico")
  }
}
export function handleArrowForToggle(){
  const sidebarProducts= document.getElementById("sidebar-loja");
  sidebarProducts.addEventListener('click',(event)=>{
    if(event.target.classList.contains('arrow')){
      let elementParent=event.target.parentNode;
      let hideElement= elementParent.nextElementSibling;
      hideElement.style.transfom="translateY(0)";
      hideElement.style.transition="0.5s";
      hideElement.classList.toggle("hide");
      if(hideElement.classList.contains('hide')){
        event.target.setAttribute("src","../assets/imagens/icons8_down_arrow.ico")
      }else{
        event.target.setAttribute("src","../assets/imagens/icons8_up_arrow.ico")
      }
    }
  })
}

export function handleScreensToShowShopping(){
  const screenOne=document.querySelector('.wrapper .screen-1');
  const screenTwo=document.querySelector('.wrapper .screen-2');
  screenOne.classList.toggle('hide');
  screenTwo.classList.toggle('hide');
}

