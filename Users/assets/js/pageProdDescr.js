console.log('agua');
const inputDate=document.querySelector('#date');
const btnSalve=document.querySelector('#btn-date');
btnSalve.onclick=salvedate;
function salvedate(){
  let dataInput=new Date(inputDate.value).getTime();
  let datanow= new Date().getTime();
  if(datanow<dataInput){
    console.log('date da maquina:'+datanow);
    console.log('data do input é maior:'+dataInput);
  }else{
    console.log('date da maquina:'+datanow);
    console.log('data do input é menor:'+dataInput);
  }
}
