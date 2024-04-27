export class Modal{
 constructor({type,message}){
   this.modalWrapper= document.querySelector('body > .modal-wrapper-alert');
   this.text=this.modalWrapper.querySelector('.content-modal > .text-modal');
   this.open(type,message);
 }
 open(type,message){
  setTimeout(()=>this.close(),4000);
  this.modalWrapper.classList.add('open-alert');
  this.text.textContent=message;
  if(type==="sucess"){
    this.modalWrapper.querySelector('.border').style.backgroundColor="hsl(var(--hue), 62%, 63%)";
    let h4=this.modalWrapper.querySelector('.content-modal > h4');
    h4.textContent="Sucess !";
    h4.style.color="hsl(var(--hue), 62%, 63%)";
  }else{
    this.modalWrapper.querySelector('.border').style.backgroundColor="hsl(0, 96%, 50%)";
    let h4=this.modalWrapper.querySelector('.content-modal > h4');
    h4.textContent="Error !";
    h4.style.color="hsl(0, 96%, 50%)";
  }
 }

 close(){
  this.modalWrapper.classList.remove('open-alert');
  // let sucess=hsl(var(--hue), 62%, 63%);
  // let error=hsl(0, 96%, 50%);
 }

};

export class ModalConfirm{
  constructor(message) {
    this.message = message;
    this.createModal();
    this.result = null;
    this.modalWrapper = document.querySelector(".modal-wrapper-comfitm");
    this.btnCancel = document.querySelector('.cancel');
    this.btnConfirm = document.querySelector('.confirm');
    this.bindEvents();
  }

  static async open(message) {
    const modal = new ModalConfirm(message);
    modal.modalWrapper.style.display = "grid";
      await new Promise(resolve => { 
        modal.resolve = resolve;
      });
      return modal.result;
  }

  close(){
    // this.modalWrapper.style.display = "none";
    document.body.removeChild(this.modalWrapper);
    document.head.removeChild(this.style);
  }

  bindEvents(){
    this.btnCancel.addEventListener('click', () => {
      this.result = false;
      this.close();
      this.resolve(this.result);
      // console.log(this.result)
    });

    this.btnConfirm.addEventListener('click', () => {
      this.result = true;
      this.close();
      this.resolve(this.result);
      // console.log(this.result)
    });
  }

  createModal() {
    const modalWrapper = document.createElement('div');
    const modal = document.createElement("div");
    const div =document.createElement('div')
    const btnCancel = document.createElement('button');
    const btnConfirm = document.createElement('button');
    const p = document.createElement('p');
    const text = document.createTextNode(this.message);

    document.body.appendChild(modalWrapper);

    modalWrapper.classList.add('modal-wrapper-comfitm');
    btnCancel.classList.add('cancel');
    btnConfirm.classList.add('confirm');
    modal.classList.add('modal-confirm');

    modalWrapper.style.position = "fixed";
    modalWrapper.style.top = "0";
    modalWrapper.style.right = "0";
    modalWrapper.style.bottom = "0";
    modalWrapper.style.left = "0";
    modalWrapper.style.zIndex = "999";
    modalWrapper.style.display = "none";
    modalWrapper.style.backgroundColor ="var(--bg-modal)";
    modalWrapper.style.backdropFilter="blur(2px)";
    modalWrapper.style.placeContent = "center";

    p.style.textAlign="center";
    
    btnCancel.textContent = "NÃO";

    btnConfirm.textContent = "OK";

    // Adiciona o estilo CSS para a animação ao modal
    this.style = document.createElement('style');
    this.style.textContent = `
      .modal-confirm{
        max-width:400px;
        width:100%;
        padding:30px 50px;
        position:relative;
        top:-100px;
        display:grid;
        place-items:center;
        row-gap:2rem;
        background:#fff;
        border-radius:.8rem;
        transition: transform 0.3s ease;
        transform: translateY(-40px);
      }
      .modal-confirm>div{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        gap:1rem;
      }
      .modal-confirm button.cancel, 
      .modal-confirm button.confirm{
        width:50%;
        padding:1rem;
        border-radius:.8rem;
        font-weight:bold;
        color:white;
        transition: opacity 0.3s ease;
      }
      .modal-confirm .cancel{
        background:var(--fc-error);
      }
      .modal-confirm .confirm{
        background:#67db7e;
      }
      .modal-confirm>div>button:hover{
        opacity:0.75;
      }
    `;
    document.head.appendChild(this.style);

    p.appendChild(text);
    modal.appendChild(p);
    modal.appendChild(div)
    div.appendChild(btnConfirm);
    div.appendChild(btnCancel);
    modalWrapper.appendChild(modal);

    this.btnCancel = btnCancel;
    this.btnConfirm = btnConfirm;
  }
}