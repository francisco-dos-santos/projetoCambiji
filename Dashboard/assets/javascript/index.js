import eyestoggle from "./toogleEyes.js";
import { setError,setSucess } from "./functionsSet&Get_Error.js";
console.log('ola testando a app');

function initworkMain(){
  
  function initTab(){
    const buttonsTab=document.querySelectorAll('aside .btn-sidebar');
    buttonsTab[0].classList.add('active-sidebar');
    const Modal={
      modalWrapper:document.querySelector('#wrapper-modal-login'),
      btnClose:document.querySelector('.modal .btn-close'),
      openModal(){
        this.modalWrapper.classList.add('open-modal');
      },
      closeModal(){
        Modal.btnClose.addEventListener('click',()=>{
          this.modalWrapper.classList.remove('open-modal');
          buttonsTab.forEach(button=>button.classList.remove('active-sidebar'));
          buttonsTab[0].classList.add('active-sidebar');
        })
      }
    }

    buttonsTab.forEach(button=>{
      button.addEventListener('click',function(){
        activeTab(button);
      });
    });

    function activeTab(button){
      buttonsTab.forEach(button=>button.classList.remove('active-sidebar'));
      if(button.textContent.trim()!=='Dashboard'){
        button.classList.add('active-sidebar');
        Modal.openModal();
      }
    }
    Modal.closeModal();
  }

  function initWorkOnModal(){
    const form = document.querySelector(".form-login")
    const buttonEnter = form.querySelector(".btn-enter");
    const inputEmail=form.querySelector('#email-admin');
    const inputPassword=form.querySelector('#password-admin');

    // functions
    function toogleEye(){
      let eye=form.querySelector('.eye');
      eye.addEventListener('click',function(){
        let input=eye.previousElementSibling;
        eyestoggle(eye,input);
      });
    }
    function validatyFields(){
      let email=inputEmail.value.trim();
      let password=inputPassword.value.trim();

      if(email===""){
        setError(inputEmail,"O email é obrigatório");
        return;
      }else if(!email.includes('@')){
        setError(inputEmail,"digite um email valido");
        return;
      }else{
        setSucess(inputEmail);
      }

      if(password===""){
        setError(inputPassword,"O senha é obrigatório");
        return
      }else{
        setSucess(inputPassword);
      }

      return true;
    }
    async function getUserAdmin(email,senha){
      const response = await fetch('../admin.json');
      const userAdmin = await response.json();

      setTimeout(function(){
        const warnUSer=form.querySelector('.warn-data');
        let isUserAdmin= userAdmin.find(user=>user.email==email && user.password==senha);
        if(isUserAdmin){
          console.log(isUserAdmin);
          warnUSer.classList.add('hide-warn');
        }else{
          warnUSer.classList.remove('hide-warn');
        }
      },1000);
    }

    buttonEnter.addEventListener('click',async (event)=>{
      event.preventDefault();
      if(validatyFields()){
        await getUserAdmin(inputEmail.value,inputPassword.value);
      }else{ 
        console.warn('error de campos do input');
      }
    });

    toogleEye();
  }
  initTab();
  initWorkOnModal();
}

document.addEventListener('DOMContentLoaded',()=>{
  initworkMain();
})