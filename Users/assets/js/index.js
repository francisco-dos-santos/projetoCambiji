let SetUsers=function(userName,email,password){
  this.userName=userName,
  this.email=email,
  this.password=password
}

function setUsersStorage(){
	localStorage.setItem("BD_Users",JSON.stringify(users.List))
}
const users={
    List:[],
    contains:function(email){
      let retValue=false;
        for( let user of this.List){
          if( user.email===email){
            retValue=true;
            break;
          }
      }
      return retValue
    },

    add:function(name,email,passe){
      if(!this.contains(email))
			{
				this.List.push(new SetUsers(name,email,passe));
				setUsersStorage();
			}
    },
}
SetUsers.prototype.show = function() {
	console.log(`${this.userName} (${this.email}, ${this.password})`);
}

users.show = function() {
for(let user of this.List) {
	console.log(`${this.userName} (${this.email}, ${this.password})`);
	}
}


const userName=document.querySelector("#name");
const userEmail=document.querySelector("#email")
const userPasse=document.querySelector("#passe1");
const btnAccess=document.querySelector("#btn-access");

btnAccess.addEventListener("click",()=>{
	let userNameValue=userName.value;
	let userEmailValue=userEmail.value;
	let userPasseValue=userPasse.value;
	users.add(userNameValue,userEmailValue,userPasseValue);
	userName.value="";
	userEmail.value="";
	userPasse.value="";
	users.show();
})


