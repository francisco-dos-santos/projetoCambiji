export default function initUsers(){
  const users = document.getElementById("user");
  
  if(users){
    function initRenderUsers(){
      const users=JSON.parse(localStorage.getItem("BD_Users"))??[];
      const containerUsers=document.querySelector('#users');
      const template= document.querySelector('#users template');
    if(users.length!==0 && users!==undefined){
      containerUsers.innerHTML="";
      for(let user of users){
          const ItemUser=template.content.cloneNode(true);
          ItemUser.querySelector('.info-product span:first-child').innerText=user.userName;
          ItemUser.querySelector('.info-product span:last-child').innerText=user.description || 'nenhuma descrição';
          ItemUser.querySelector('.price-item').innerText=user.email;
    
          ItemUser.querySelector('.sub-total').textContent=user.namberPhone || 'sem Número';
          ItemUser.querySelector('.payment').textContent='Compras:'+ user.shoppings.length || '0';
          ItemUser.querySelector('.status').textContent='Serviços:'+ user.Services.length || '0';
          containerUsers.appendChild(ItemUser);
    
      }
    }else{
      const h3=document.createElement('h3');
      const texto=document.createTextNode('Estas Usuarios cadastrados!');
      h3.appendChild(texto);
      h3.style.textAlign="center";
      containerUsers.appendChild(h3);
    }
      
    }
    console.log('users section');
    initRenderUsers();    
  }
}
