export function setError(input,message){
  let wrapperInput=input.parentElement;
  let small= wrapperInput.querySelector('small');
  wrapperInput.classList.remove('sucess');
  wrapperInput.classList.add('error');
  small.textContent=message;
}
export function setSucess(input){
  let wrapperInput=input.parentElement;
  wrapperInput.classList.remove('error');
  wrapperInput.classList.add('sucess');
}