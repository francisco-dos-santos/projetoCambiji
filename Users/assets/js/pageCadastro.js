let SetUsers=function(userName,email,password){
  this.userName=userName,
  this.email=email,
  this.password=password
}

const users={
    List:[],
    contains:function(newEmail){
        return let RetValue=this.List.some(user => user.email === newEmail);
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


users.show = function() {
for(let user of this.List) {
  console.log(`${user.userName} (${user.email}, ${user.password})`);
	}
}

const form=document.querySelector(".form");
const userName=document.querySelector("#name");
const userEmail=document.querySelector("#email")
const userPasse=document.querySelector("#passe1");
const userPasseTwo=document.querySelector("#passe2");
const btnAccess=document.querySelector("#btn-access");


btnAccess.addEventListener("click",()=>{
  if(checkedfilds()){
    let userNameValue=userName.value;
    let userEmailValue=userEmail.value;
    let userPasseValue=userPasse.value;
    let userPasseTwoValue=userPasseTwo.value;
    setTimeout(()=>{
    users.add(userNameValue,userEmailValue,userPasseTwoValue);
	  userName.value="";
	  userEmail.value="";
	  userPasse.value="";
    userPasseTwo.value="";
    return
    },3000)
    console.log("loading...")
    
  }
  console.log("não foi enviado");
})

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