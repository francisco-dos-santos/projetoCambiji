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
function isLetters(input){
  return /[A-Za-z]+/.test(input);
}
function iscount(input){
  return input.length>=7?true:false;
}
function isnumber(input){
  return /[0-9]+/.test(input);
}

export function isnumberCard(input){
  return /^\d{16,}$/.test(input);
}
export function isData(input){
  return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(input);

}
export function isNumberA0(input){
  return /^9[12345]\d{7}$/.test(input);
}
export function isValueCVV(input){
  return /^\d{3}$/.test(input);
}
export function setErrorInTwoInputs(input,message){
  const parentchild= input.parentNode;
  const parent= parentchild.parentNode;
  parent.classList.remove("sucess")
  parent.classList.add("error")
  let small=parent.querySelector("small");
  small.textContent=message;
}
export function setSucessInTwoInputs(input){
  const parentchild= input.parentNode;
  const parent= parentchild.parentNode;
  parent.classList.add("sucess")
  parent.classList.remove("error")
}
export{setError,setSucess,isLetters,iscount,ismail,isnumber}