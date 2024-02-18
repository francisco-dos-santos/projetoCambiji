
  const userNameHeader=document.getElementById("user-name");
  const users=JSON.parse(localStorage.getItem("BD_Users"))??[];
  const index=1+JSON.parse(sessionStorage.getItem("Id_users"))||'';
  export function addNameUser(){
  if(users.length!==0 && index!==null){
    userNameHeader.textContent=users[index-1].userName;
    const contLink= document.getElementById('cont-link');
    contLink.setAttribute('title',`${users[index-1].userName}`);
  }
}