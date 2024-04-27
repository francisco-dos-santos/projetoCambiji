
  import initDashboard from "./dashboard.js";
  import initSettings from "./settings.js";
  import initUsers from "./users.js";
  import initServices from "./services.js";
  import initShoppings from "./shoppings.js";
  import { Modal} from "./modal.js";
 
  function initWorkPageMain(){
  const userAdmin=JSON.parse(sessionStorage.getItem('userAdmin'));


  function initWorkheader(){
    const header= document.querySelector('header');

    function getInfoUser(){
      const avatarProfile=header.querySelector('.content-img-admin img');
      const nameUser= header.querySelector('.content-info-people-admin > .name-admin');
      const emailUser= header.querySelector('.content-info-people-admin > .email-admin');

      avatarProfile.setAttribute('src','../assets/imagens/'+userAdmin.image+'');
      nameUser.textContent=userAdmin.name;
      emailUser.textContent=userAdmin.email;
    }

    getInfoUser();
  }
  function initNavTab(){
    const tabButtons= document.querySelectorAll('aside .btn-sidebar');
    const root=document.getElementById("root");
    let xhr;
    tabButtons[0].classList.add('active-sidebar');
    if(tabButtons[0].classList.contains('active-sidebar')){
      let name= tabButtons[0].getAttribute('content_Id');
      let signIn=JSON.parse(sessionStorage.getItem('sign-in')) ?? '';
      if(signIn.sign){
        new Modal({type:"sucess",message:"Benvindo a pagina de administrador, da Cambiji Nature"});
        sessionStorage.removeItem('sign-in');
      }
      navegatingInSections(name);
    }
    
    function navegatingInSections(nameLink){
      xhr = new XMLHttpRequest();

      xhr.onreadystatechange = ToDoRequest;

      xhr.open('GET',`${nameLink}.html`);
      xhr.send(null);

    }
    function ToDoRequest(){
      root.innerHTML=`<center><img src="../assets/imagens/init-loading.gif"></center>`;
      if(xhr.readyState===4){
        if(xhr.status===200){
          setTimeout(()=>{
            const response = xhr.responseText;
            root.innerHTML=response;
            initDashboard();
            initUsers();
            initShoppings();
            initServices();
            initSettings();
          },200);

        }
      }
    }
    function activeTab(button){
      tabButtons.forEach(button=>{button.classList.remove('active-sidebar')});
      button.classList.add('active-sidebar');
      if(button.classList.contains('active-sidebar')){
        const nameLink= button.getAttribute('content_Id');
        if(nameLink!=='logout'){
          navegatingInSections(nameLink);
        }
      }
      
    }

    tabButtons[6].onclick=()=>{
      let logout= confirm('Tens a certeza que desejas sair?');
        console.log(logout);
          if(logout){
            window.location.href=".././index.html";
            sessionStorage.removeItem('userAdmin');
        }
      }
    tabButtons.forEach(button=>{
      button.addEventListener('click',function(){
        activeTab(button);
      })
    });
    console.log(root);
    
  }
  initWorkheader();
  initNavTab();
}




document.addEventListener('DOMContentLoaded',function(){
  initWorkPageMain();
});