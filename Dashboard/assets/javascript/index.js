console.log('ola testando a app');
import eyestoggle from "./toogleEyes";

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
    const form = document.querySelector(".form-login");
    const inputEmail=form.querySelector('#email-admin');
    const inputPassword=form.querySelector('#password-admin');

    function toogleEye(){
      let eye=form.querySelector('.eye');
      eye.addEventListener('click',function(){
        let input=eye.pare
      });
    }
    function validatyFields(){
      let email=inputEmail.value.trim();
      let password= inputPassword.value.trim();

    }


    form.addEventListener('submit',(event)=>{
      event.preventDefault();
      console.log(form.querySelector('.eye'));
    });


    toogleEye();
  }
  initTab();
  initWorkOnModal();
}

document.addEventListener('DOMContentLoaded',()=>{
  initworkMain();
})