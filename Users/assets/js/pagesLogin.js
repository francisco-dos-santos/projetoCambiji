const usersList=JSON.parse(localStorage.getItem("BD_Users"))??[];
const userEmail=document.getElementById("email");
const userSenha=document.getElementById("passe");
const btnLogin=document.getElementById("btn-access");
const loader=document.querySelector(".loader");

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
function toggleEye(){
  const eye=document.querySelector('.eye');
  if(userSenha.type ==="password"){
    userSenha.setAttribute("type","text");
    eye.setAttribute("src","../assets/imagens/icons8_hide.ico")
  }else{
    userSenha.setAttribute("type","password");
    eye.setAttribute("src","../assets/imagens/icons8_eye.ico")
  }
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
        usersList.forEach((element,index)=>{
          if(element.email==isUser.email && element.password==isUser.password){
            saveIdUsers(index);
            window.location.href="../pages-logado/inicio-logado.html";
          }
        });
      }else{
        alert("user inexistent digite outros dados");
      }
      console.log("finally")
    },4000);
    loader.classList.add("show");
  }
  else{
    console.log("was checked filds is invalidity");
  }
}

function saveIdUsers(index){
  localStorage.setItem("Id_users",JSON.stringify(index));
}

btnLogin.addEventListener("click",()=>{
  isUsersExit();
  console.log("checked there is users exists");
});
