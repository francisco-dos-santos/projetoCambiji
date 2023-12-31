
let response =`[
  {
    "userName":"Francisco Dos Santos",
    "email":"franciscodossantosmr@gmail.com",
    "password":"Dev5050"
  },
  {
    "userName":"Miro Developer",
    "email":"mirodeveloper@gmail.com",
    "password":"miro2001"
  },
  {
    "userName":"Unydev Community Lda",
    "email":"unydevcommunity@gmail.com",
    "password":"uny2020"
  }
]`;
  let dataJson=JSON.parse(response);
  localStorage.setItem("BD_Users",JSON.stringify(dataJson));


const form=document.querySelector(".form");
const userName=document.querySelector("#name");
const userEmail=document.querySelector("#email")
const userPasse=document.querySelector("#passe1");
const userPasseTwo=document.querySelector("#passe2");
const btnAccess=document.querySelector("#btn-access");

function SetUsers(userName,email,password){
  this.userName=userName,
  this.email=email,
  this.password=password
}

const users={
    List: JSON.parse(localStorage.getItem("BD_Users"))||[],
    contains:function(newEmail){
      let RetValue=this.List.some(user => user.email === newEmail);
        return RetValue;
      },

    add:function(name,email,passe){
      if(!this.contains(email))
			{
				this.List.push(new SetUsers(name,email,passe));
				this.saveStorage();
			}else{
        alert("já existe uma conta com esse email digite outro");
      }
    },

    saveStorage:function(){
      localStorage.setItem("BD_Users",JSON.stringify(this.List))
    }
  }
function clearField(){
  userName.value="";
  userEmail.value="";
  userPasse.value="";
  userPasseTwo.value="";
}

function checkedfilds(){
  let userNameValue=userName.value.trim();
  let userEmailValue=userEmail.value.trim();
  let userPasseValue=userPasse.value.trim();
  let userPasseTwoValue=userPasseTwo.value.trim();
  if(userNameValue===""){
    setError(userName,"Error o nome deve ser preenchido")
    return false
  }else{
    setSucess(userName)
  }

  if(userEmailValue===""){
    setError(userEmail,"Error o email deve ser preenchido")
    return
  }else if(!ismail(userEmailValue)){
    setError(userEmail,"Error email é invalido")
    return
  }else{
    setSucess(userEmail)
  }

  if(userPasseValue===""){
    setError(userPasse,"Error a senha deve ser preenchido")
    return
  }else if(!isLetters(userPasseValue) || !iscount(userPasseValue)){
    setError(userPasse,"Error a senha deve conter letras e no maximo 7 caracters!")
    return
  }else if(!isnumber(userPasseValue)){
    setError(userPasse,"a senha deve conter nambers");
    return
  }else{
    setSucess(userPasse)
  }

  if(userPasseTwoValue===""){
    setError(userPasseTwo,"Error a senha deve preenchida")
    return
  }else if(userPasseTwoValue!==userPasseValue){
    setError(userPasseTwo,"Erro a senha deve ser igual a primeira");
    return 
  }
  else{
    setSucess(userPasseTwo)
  }


  return true
}
function setError(input,message){
  const parent=input.parentNode;
  const small=parent.querySelector("small");
  parent.classList.remove("sucess");
  parent.classList.add("error");
  small.textContent=message;
}
function setSucess(input){
  const parent =input.parentNode;
  parent.classList.remove("error");
  parent.classList.add("sucess");
}
function ismail(email){
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isLetters(senha){
  return /[A-Za-z]+/.test(senha);
}
function iscount(senha){
  return senha.length>=7?true:false;
}
function isnumber(senha){
  return /[0-9]+/.test(senha);
}
function toggleEyes(){
  const eyes=document.getElementsByClassName('eye');
  for(let eye of eyes){
    eye.onclick=function(event){
      let eyesTarget=event.target;
      let input=eyesTarget.previousElementSibling;
      if(input.type ==="password"){
        input.setAttribute("type","text");
        eyesTarget.setAttribute("src","../assets/imagens/icons8_hide.ico")
      }else{
        input.setAttribute("type","password");
        eyesTarget.setAttribute("src","../assets/imagens/icons8_eye.ico")
      }
    }
  }
}
toggleEyes();

btnAccess.addEventListener("click",()=>{
  if(checkedfilds()){
    let userNameValue=userName.value;
    let userEmailValue=userEmail.value;
    let userPasseValue=userPasse.value;
    let userPasseTwoValue=userPasseTwo.value;
    setTimeout(()=>{
    users.add(userNameValue,userEmailValue,userPasseTwoValue);
    clearField();
    },3000)
    console.log("loading...")
  }else{
    console.log("não foi enviado");
  }
});


console.log("bag");

