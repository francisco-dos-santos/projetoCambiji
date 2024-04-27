import { Modal } from "./modal.js";

export default function initServices(){
  const service = document.getElementById('service');


  class Services{
    constructor(root){
      this.root=document.getElementById(root);
      this.load();
    }
    load(){
      this.entries=JSON.parse(localStorage.getItem('BD_Users')) ?? [];
    }


    salveData(){
      localStorage.setItem("BD_Users",JSON.stringify(this.entries));
    }
  }


class ServicesView extends Services{
  constructor(root){
    super(root)
    this.tbody=this.root.querySelector('table tbody');

    this.updateServices();
  }
  updateServices(){
    this.removeAllTr();

    for(let user of this.entries) {
      user && user.Services && user.Services.forEach((service) => {
        const row = this.createRow();
        row.querySelector('td.td-user-avatar .info-user> .name-user').textContent= user.userName;
        row.querySelector('td.td-user-avatar .info-user> .email-user').textContent= user.email;
        row.querySelector('td.data-service').textContent=service.data+' «» '+service.hour; 
        row.querySelector('td.type-service').textContent=service.type;
        row.querySelector('td.price-service').textContent='A0A ' +service.valor.toFixed(2);
        row.querySelector('td.payment span').textContent=service.pay;

        if(service.status){
          row.querySelector('td.status span').textContent='Realizado.';
          row.querySelector('td.status span').style.color='aqua';
          row.querySelector('td.status span').style.borderColor='aqua';
        }
        
        row.querySelector('td.actions .see').onclick=()=>{
          console.log('clicou para ver service');
          ModalInfo.openModal(this.root,service);
        }

        row.querySelector('td.actions .confirm').onclick=()=>{
          let isOk=confirm('Desejas confirmar o serviço do usuário '+ user.userName+' ?');
          if(isOk){
            service.status=true;
            this.salveData();
            this.updateServices();
            new Modal({type:"sucess",message:"checkout do Serviço concluido com exito"});
          }
        }

        this.tbody.append(row);
      });
    }



  }
  createRow(){
    let tr= document.createElement("tr");

    tr.innerHTML=`
    <td class="td-user-avatar">
      <img src="../assets/imagens/icons8_male_user.ico" 
      alt="imagem do produto" width="40px" />
      <p class="info-user">
        <strong class="name-user">Francisco dos Santos</strong>
        <br>
        <small class="email-user">francsicodeveloper@gmail.com</small>
      </p>
    </td>
    <td class="data-service">04/02/2024 «» 11h20</td>
    <td class="type-service">Massagem Simples</td>
    <td class="price-service">kz 20000.00</td>
    <td class="payment">
      <span>Paypel</span>
    </td>
    <td class="status">
      <span>Pendente</span>
    </td>
    <td class="actions">
      <button class="menu-v" title="Menu de opções">•••</button>
      <div class="dropdrow">
        <button class="see" title="ver informações do serviço">
          <img src="../assets/imagens/icons8_eye.ico" width="18px" alt="eyes">
          Ver
        </button>
        <button class="confirm" title="Confirmar a Reserva">&check; Confirmar</button>
      </div>
    </td>
    `;

    return tr;
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr').forEach(tr=>tr.remove());
  }
}

class ModalInfo{
  constructor(root,service){
    this.service=service;
    this.root=root;
    this.wrapperInfoModal=this.root.querySelector('.wrapper-modal-info');
    this.backBtn=this.wrapperInfoModal.querySelector('.back-section');
  }
 static openModal(root,service){
    let modal=new ModalInfo(root,service);
    modal.wrapperInfoModal.classList.toggle('show-info-modal');
    console.log(service);

    modal.backBtn.onclick=()=>{
      modal.wrapperInfoModal.classList.toggle('show-info-modal');
    }
  }
}

if(service){
  // console.log(service);
  new ServicesView(service.id);
}

}