import { eyestoggle } from "./toggles.js";
import {
  setError,
  setSucess,
  isLetters,
  iscount,
  ismail,
  isnumber,
} from "./funtctionValidatyForm.js";

import { Modal } from "./modal.js";

fetch("../users.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (localStorage.getItem("BD_Users") == null) {
      localStorage.setItem("BD_Users", JSON.stringify(data));
    }
  });

const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPasse = document.querySelector("#passe1");
const userPasseTwo = document.querySelector("#passe2");
const btnAccess = document.querySelector("#btn-access");

class SetUser {
  constructor({ userName, email, password, id }) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}

class SetUsers {
  constructor() {
    this.List = JSON.parse(localStorage.getItem("BD_Users")) || [];
    this.warnData = document.querySelector("form .warn-login");
    this.textWarn = document.querySelector("form .text-warn");
  }
  set _getWarn(text) {
    this.warnData.classList.remove("hide-warn");
    this.textWarn.textContent = text;
  }
  contains(newEmail) {
    return this.List.some((user) => user.email === newEmail);
  }

  static addUser({ name, email, passe }){
    const loader = document.querySelector(".loader");
    const userSet = new SetUsers();
    userSet.warnData.classList.add('hide-warn');
      setTimeout(() => {
        loader.classList.remove("show");
        if(!userSet.contains(email)){
          userSet.List.push(
            new SetUser({
              userName: name,
              email: email,
              password: passe,
              id: userSet.List.length,
            })
          );
          userSet.saveStorage();
          Modal.open(
            "../assets/imagens/icons8_ok.ico",
            "A sua conta foi criada com sucesso"
          );
          clearField();
            setTimeout(()=>{
              userSet.goPageInitial({email:email,senha:passe});
            },1000);
        }else{
          userSet._getWarn = "Já existe uma conta com esse email, digite outro!";
        }
       
      }, 4000);
      console.log("loading...");
      loader.classList.add("show");
  }

  goPageInitial({email,senha}){
    let isUser=this.List.findIndex(user=>(user.email===email) && (user.password===senha));
    if(isUser!==-1){
      this.saveIdUsers(isUser);
      this.UserGetFirstTimes();
      window.location.href="../pages-logado/inicio-logado.html";
    }
  }

  saveStorage() {
    localStorage.setItem("BD_Users", JSON.stringify(this.List));
  }
  saveIdUsers(index){
    sessionStorage.setItem("Id_users",JSON.stringify(index));
  }
  UserGetFirstTimes(){
    sessionStorage.setItem('User_first_times',JSON.stringify(true));
  }

}


function clearField() {
  userName.value = "";
  userEmail.value = "";
  userPasse.value = "";
  userPasseTwo.value = "";
}

function checkedfilds() {
  let userNameValue = userName.value.trim();
  let userEmailValue = userEmail.value.trim();
  let userPasseValue = userPasse.value.trim();
  let userPasseTwoValue = userPasseTwo.value.trim();
  if (userNameValue === "") {
    setError(userName, "Error o nome deve ser preenchido");
    return false;
  } else {
    setSucess(userName);
  }

  if (userEmailValue === "") {
    setError(userEmail, "Error o email deve ser preenchido");
    return;
  } else if (!ismail(userEmailValue)) {
    setError(userEmail, "Error email é invalido");
    return;
  } else {
    setSucess(userEmail);
  }

  if (userPasseValue === "") {
    setError(userPasse, "Error a senha deve ser preenchido");
    return;
  } else if (!isLetters(userPasseValue) || !iscount(userPasseValue)) {
    setError(
      userPasse,
      "Error a senha deve conter letras e no maximo 7 caracters!"
    );
    return;
  } else if (!isnumber(userPasseValue)) {
    setError(userPasse, "a senha deve conter nambers");
    return;
  } else {
    setSucess(userPasse);
  }

  if (userPasseTwoValue === "") {
    setError(userPasseTwo, "Error a senha deve preenchida");
    return;
  } else if (userPasseTwoValue !== userPasseValue) {
    setError(userPasseTwo, "Erro a senha deve ser igual a primeira");
    return;
  } else {
    setSucess(userPasseTwo);
  }

  return true;
}

function toggleEyes() {
  const eyes = document.getElementsByClassName("eye");
  for (let eye of eyes) {
    eye.onclick = function (event) {
      let eyesTarget = event.target;
      let input = eyesTarget.previousElementSibling;
      eyestoggle(eyesTarget, input);
    };
  }
}
toggleEyes();

btnAccess.addEventListener("click", () => {
  if (checkedfilds()){
    let userNameValue = userName.value;
    let userEmailValue = userEmail.value;
    let userPasseTwoValue = userPasseTwo.value;
    SetUsers.addUser({
      name: userNameValue,
      email: userEmailValue,
      passe: userPasseTwoValue,
    });
  } else {
    console.warn("não foi enviado");
  }
});

console.log("bag");
