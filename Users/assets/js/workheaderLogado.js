
  const userNameHeader=document.getElementById("user-name");
  const users=JSON.parse(localStorage.getItem("BD_Users"))??[];
  export const index=1+JSON.parse(sessionStorage.getItem("Id_users"))||'';
  export function addNameUser(){
  if(users.length!==0 && index!==null){
    let cortar=(users[index-1].userName).slice(0,4);
    userNameHeader.textContent=cortar+"...";
    const contLink= document.getElementById('cont-link');
    contLink.setAttribute('title',`${users[index-1].userName}`);
  }
}