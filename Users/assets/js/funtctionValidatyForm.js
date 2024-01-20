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
function isLetters(senha){
  return /[A-Za-z]+/.test(senha);
}
function iscount(senha){
  return senha.length>=7?true:false;
}
function isnumber(senha){
  return /[0-9]+/.test(senha);
}
export{ setError,setSucess,isLetters,iscount,ismail,isnumber}