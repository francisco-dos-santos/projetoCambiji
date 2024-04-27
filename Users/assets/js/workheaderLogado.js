
  import { ConfirmModal } from "./modal.js";

  const users=JSON.parse(localStorage.getItem("BD_Users"))??[];
  const index=1+JSON.parse(sessionStorage.getItem("Id_users"))||'';

  export function addNameUser(){
  if(users.length!==0 && index!==null){
    const userNameHeader=document.getElementById("user-name");
    const contLink= document.getElementById('cont-link');
    const infoName=document.querySelector('.dropdown .info-user-name');
    const infoEmail=document.querySelector('.dropdown .info-user-email');
    userNameHeader.textContent=users[index-1].userName;
    contLink.setAttribute('title',`${users[index-1].userName}`);
    infoName.textContent=users[index-1].userName;
    infoEmail.textContent=users[index-1].email;

    function goOut(){
      const goOutLink=document.querySelector('.dropdown .go-out');
      goOutLink.addEventListener('click',async ()=>{
        let isOk= await ConfirmModal.open('Desejas Sair da conta?');
        if(isOk){
          sessionStorage.removeItem("Id_users");
          window.location.href="../index.html";
        }
      })
    }
    
    goOut();
  }
}