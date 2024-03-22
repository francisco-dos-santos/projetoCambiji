 
 
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


  initWorkheader();

}







document.addEventListener('DOMContentLoaded',function(){
  initWorkPageMain();
});