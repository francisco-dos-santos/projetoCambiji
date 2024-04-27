import { Modal} from "./modal.js";

export default function initUsers(){
  const users = document.getElementById("users");

  class Users{
    constructor(root){
      this.root=document.getElementById(root);
      this.load();
    }

    load(){
      this.entries=JSON.parse(localStorage.getItem('BD_Users')) ?? [];
    }

    delete(user){
      const filteredEntries= this.entries.filter(entry=>entry.email !== user.email);
      this.entries=filteredEntries;
      this.salveData(this.entries);
      this.update();
    }

    salveData(entries){
      localStorage.setItem("BD_Users",JSON.stringify(entries));
    }

  }

  class UsersView extends Users{
    constructor(root){
      super(root)
    
      this.tbody=this.root.querySelector('table tbody');

      this.update()
    }

    update(){
      this.removeAllTr();
      

      this.entries.forEach( user =>{
        const row= this.createRow();

        row.querySelector('td.td-user-avatar .info-user> .name-user').textContent= user.userName;
        row.querySelector('td.td-user-avatar .info-user> .email-user').textContent= user.email;
        row.querySelector('td.date-sign-up').textContent= user.dateCreate || "06/04/2003";
        row.querySelector('td.number-user').textContent= user.phoneNumber;
        row.querySelector('td.genere-user').textContent= user.genere;
        row.querySelector('td.shoppngs-total-user span').textContent=user.shoppings ? user.shoppings.length +" Shops" : "0 Shops" ;
        row.querySelector('td.service-total-user span').textContent= user.Services? user.Services.length +" Servs" : "0 Servs" ;

        row.querySelector('td.actions .see').onclick=()=>{
          console.log('clicou para ver user');
          ModalInfo.openModal(this.root,user);
        }

        row.querySelector('td button.remove').onclick=()=>{
          const isOk = confirm('Tem certeza que deseja deletar o usuário '+user.userName+' ?');
        if(isOk) {
          this.delete(user);
          new Modal({type:"sucess",message:"Usuário eliminado com sucesso!"});
        }

       }

       this.tbody.append(row);
      });

    }

    createRow(){
      const tr = document.createElement("tr");

      tr.innerHTML=`
        <td class="td-user-avatar">
        <img src="../assets/imagens/icons8_male_user.ico" 
        alt="imagem do produto" width="40px"/>
        <p class="info-user">
          <strong class="name-user">Francisco dos Santos</strong>
          <br>
          <small class="email-user">francsicodeveloper@gmail.com</small>
        </p>
        </td>
        <td class="date-sign-up">04/02/2024</td>
        <td class="number-user">945454345</td>
        <td class="genere-user">Masculino</td>
        <td class="shoppngs-total-user">
          <span>3 Shops</span>
        </td>
        <td class="service-total-user">
          <span>4 Servs</span>
        </td>
        <td class="actions">
          <button class="menu-v" title="Menu de opções">•••</button>
          <div class="dropdrow">
            <button class="see" title="ver informações da usuário">
              <img src="../assets/imagens/icons8_eye.ico" width="18px" alt="eyes">
              Ver
            </button>
            <button class="remove" title="Eliminar usuário">&times; Eliminar</button>
          </div>
        </td>
      `;

      return tr;
    }

    removeAllTr(){
      this.tbody.querySelectorAll('tr')
        .forEach(tr => tr.remove()); 
      }

  }


  class ModalInfo{
    constructor(root,user){
      this.user=user;
      this.root=root;
      this.wrapperInfoModal=this.root.querySelector('.wrapper-modal-info');
      this.backBtn=this.wrapperInfoModal.querySelector('.back-section');
    }
   static openModal(root,user){
      let modal=new ModalInfo(root,user);
      modal.wrapperInfoModal.classList.toggle('show-info-modal');
      console.log(user);
  
      modal.backBtn.onclick=()=>{
        modal.wrapperInfoModal.classList.toggle('show-info-modal');
      }
    }
  }


  if(users){
    new UsersView(users.id);
  }
}