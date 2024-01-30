export class Modal {
  constructor(src,message) {
    this.createModal(src,message);
    this.modalWrapper = document.querySelector(".modal-wrapper");
    this.btnClose = document.querySelector('.close');
    this.bindEvents();
  }

  static open(src, message) {
    const modal = new Modal(src,message);
    modal.createModal(src, message);
    modal.modalWrapper.style.display = "grid";
    // Espera um pouco antes de aplicar a animação para garantir que o elemento esteja renderizado
    setTimeout(() => {
      let child = modal.modalWrapper.querySelector('.modal');
      child.style.transform = "translateY(0)";
    },50); 
  }
  close(el){
    el.style.display = "none";
  }

  bindEvents() {
    const self = this;
    this.btnClose.addEventListener('click', function () {
      self.close(self.modalWrapper);
    });
  }

  createModal(src = "", message="") {
    const modalWrapper = document.createElement('div');
    const body = document.body;
    const modal = document.createElement("div");
    const buttonClose = document.createElement('button');
    let img = document.createElement('img');
    let p = document.createElement('p');
    let text = document.createTextNode(message);
    
    body.style.position="relative";
    body.appendChild(modalWrapper);

    modalWrapper.classList.add('modal-wrapper');
    buttonClose.classList.add('close');
    modal.classList.add('modal');



    modalWrapper.style.position = "fixed";
    modalWrapper.style.top = "0";
    modalWrapper.style.right = "0";
    modalWrapper.style.bottom = "0";
    modalWrapper.style.left = "0";
    modalWrapper.style.zIndex = "999";
    modalWrapper.style.display = "none";
    modalWrapper.style.backgroundColor ="rgba(0,0,0,0.60)";
    modalWrapper.style.placeContent = "center";

    modal.style.backgroundColor = "white";
    modal.style.paddingBlock = "50px";
    modal.style.paddingInline = "68px";
    modal.style.width="400px";
    modal.style.position = "relative";
    modal.style.top="-100px";
    modal.style.borderRadius = "1rem";
    modal.style.display = "flex";
    modal.style.flexDirection = "column";
    modal.style.textAlign = "center";
    modal.style.gap = "15px";

    // Adiciona o estilo CSS para a animação ao modal
    const style = document.createElement('style');
    style.textContent = `
      .modal {
        transition: transform 0.3s ease;
        transform: translateY(-40px);
      }
    `;
    document.head.appendChild(style);

    buttonClose.textContent = "X";
    buttonClose.style.position = "absolute";
    buttonClose.style.top = "10px";
    buttonClose.style.right = "17px";
    buttonClose.style.border = "none";
    buttonClose.style.padding = "1.6rem";
    buttonClose.style.backgroundColor = "transparent";
    buttonClose.style.color="#ff0d0d";
    buttonClose.style.fontSize = "1.6rem";
    p.style.fontSize="2rem";
    p.style.fontFamily="'Roboto',sans-serif";

    modalWrapper.appendChild(modal);
    img.setAttribute('src', src);
    img.setAttribute('alt', "imagem de userExperinence");
    p.appendChild(text);
    modal.appendChild(buttonClose);
    modal.appendChild(img);
    modal.appendChild(p);
  }
};

export class ConfirmModal {
  constructor(message) {
    this.message = message;
    this.result = null;
    this.createModal();
    this.modalWrapper = document.querySelector(".modal-wrapper-comfitm");
    this.btnCancel = document.querySelector('.cancel');
    this.btnConfirm = document.querySelector('.confirm');
    this.bindEvents();
  }

  static async open(message) {
    const modal = new ConfirmModal(message);
    modal.modalWrapper.style.display = "grid";
   await new Promise(resolve => { 
      modal.resolve = resolve;
    });
    return modal.result;
  }

  close() {
    this.modalWrapper.style.display = "none";
  }

  bindEvents() {
    this.btnCancel.addEventListener('click', () => {
      this.result = false;
      this.close();
      this.resolve(this.result);
      console.log(this.result)
    });

    this.btnConfirm.addEventListener('click', () => {
      this.result = true;
      this.close();
      this.resolve(this.result);
      console.log(this.result)
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
    modalWrapper.style.backgroundColor ="rgba(0,0,0,0.60)";
    modalWrapper.style.placeContent = "center";

    p.style.textAlign="center";
    
    btnCancel.textContent = "Cancelar";

    btnConfirm.textContent = "Confirmar";

    // Adiciona o estilo CSS para a animação ao modal
    const style = document.createElement('style');
    style.textContent = `
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
        display:flex;
        align-items:center;
        justify-content:flex-end;
        gap:1rem;
      }
      .modal-confirm button.cancel, 
      .modal-confirm button.confirm{
        padding:1rem;
        border-radius:.8rem;
        font-weight:bold;
        color:white;
        transition: opacity 0.3s ease;
      }
      .modal-confirm .cancel{
        background:#ff0d0d;
      }
      .modal-confirm .confirm{
        background:#67db7e;
      }
      .modal-confirm>div>button:hover{
        opacity:0.75;
      }
    `;
    document.head.appendChild(style);

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