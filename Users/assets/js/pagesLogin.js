const usersList=JSON.parse(localStorage.getItem("BD_Users"))??[];
const userEmail=document.getElementById("email");
const userSenha=document.getElementById("passe");
const btnLogin=document.getElementById("btn-access")

console.log(usersList);

function setError(input,message){
  const parent=input.parentNode;
  parent.classList.remove("sucess")
  parent.classList.add("error")
  let small=parent.querySelector("small");
  small.textContent=message;
}

function setSucess(input){
  const parent=input.parentNode;
  parent.classList.add("sucess")
  parent.classList.remove("error");
}
function ismail(email){
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email); 
}

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

function isCheckedUsers(){
  let userEmailV= userEmail.value;
  let userSenhaV=userSenha.value;
  if(checkedInputs()){
    setTimeout(()=>{
      usersList.forEach((element,index)=>{
        if(element.email===userEmailV && element.password===userSenhaV){
          console.log("User find: "+element.email+" :"+element.password);
          saveIdUsers(index);
        }
        else{
          console.log(" not is there users with this data try again");
        }
      });
    },2000)
    console.log("checkeding user if existe...")
  }
  else{
    console.log("was checked filds is invalidity");
  }
}

function saveIdUsers(index){
  localStorage.setItem("Id_users",JSON.stringify(index));
}

btnLogin.addEventListener("click", isCheckedUsers);