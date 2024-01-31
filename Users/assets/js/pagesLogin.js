import { eyestoggle } from "./togglesEyes.js";
import { setError,setSucess,ismail } from "./funtctionValidatyForm.js";
import { Modal } from "./modal.js";
const usersList=JSON.parse(localStorage.getItem("BD_Users"))??[];
const userEmail=document.getElementById("email");
const userSenha=document.getElementById("passe");
const btnLogin=document.getElementById("btn-access");
const loader=document.querySelector(".loader");
const eye=document.querySelector('.eye');

// functions
function checkedInputs(){
  let userEmailV= userEmail.value.trim();
  let userSenhaV=userSenha.value.trim();

  if(userEmailV===""){
    setError(userEmail,"O email deve ser preenchido");
    return false
  }else if(!ismail(userEmailV)){
    setError(userEmail,"O email não é valido");
    return false
  }else{
    setSucess(userEmail)
  }

  if(userSenhaV==="")
  {
    setError(userSenha,"a senha deve ser preenchida");
    return false
  }else{
    setSucess(userSenha);
  }
  return true;
}
function toggleEye(){
  eyestoggle(eye,userSenha);
}
function clearField(){
  userEmail.value="";
  userSenha.value="";
}
function isUsersExit(){
  let userEmailV= userEmail.value;
  let userSenhaV=userSenha.value;
  if(checkedInputs()){
    setTimeout(()=>{
      loader.classList.remove("show");
      let isUser=usersList.find(user=>{
        return (user.email===userEmailV) && (user.password===userSenhaV);
      })
      if(isUser){
        saveIdUsers(isUser.id);
        window.location.href="../pages-logado/inicio-logado.html";
        clearField();
      }else{
        Modal.open("../assets/imagens/icons8_error.ico","Dados invalido(email ou senha) digite outros dados");
      }
      console.log("finally")
    },4000);
    loader.classList.add("show");
  }
}
function saveIdUsers(index){
  sessionStorage.setItem("Id_users",JSON.stringify(index));
}
// events
btnLogin.addEventListener("click",(event)=>{
  event.preventDefault();
  isUsersExit();
  console.log("checked there is users exists");
});
eye.addEventListener("click",toggleEye)