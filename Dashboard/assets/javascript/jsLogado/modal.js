export class Modal{
 constructor({cor,message}){
   this.modalWrapper= document.querySelector('body > .modal-wrapper-alert');
   this.text=document.querySelector('.modal-wrapper-alert > .text-modal');
   this.open(cor,message);
 }
 open(cor,message){
  setTimeout(()=>this.close(),4000);
  this.modalWrapper.classList.add('open-alert');
  this.text.textContent=message;
  this.modalWrapper.style.backgroundColor=cor;
 }
 close(){
  this.modalWrapper.classList.remove('open-alert');
  // let sucess=hsl(var(--hue), 14%, 96%);
  // let error=hsl(0, 96%, 50%);
 }

};

export class ModalSucess{
  constructor(){

  }
}