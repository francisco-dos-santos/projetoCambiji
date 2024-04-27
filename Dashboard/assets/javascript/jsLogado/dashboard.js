export default function initDashboard(){
  const dashboard= document.getElementById('dashboard');

if(dashboard){
  const users= JSON.parse(localStorage.getItem('BD_Users')) ?? [];
  function getAllUsers(){
    dashboard.querySelector('.user-full').textContent=users.length  || '0';
  }
  function getAllSalesReservas(){
    let allServices=users && users.filter(item=>item.Services!==undefined)
    .map(item=>item.Services.map(item=>item.valor).reduce((acc,item)=>acc+item,0)).reduce((acc,item)=>acc+item,0);
    dashboard.querySelector('.service-full').textContent='A0A '+ allServices.toFixed(2).replaceAll('.',',')  || '0,00';
    // console.log(allServices);
  }
  function getAllSalesShopping(){
    let allShoppings=users && users.filter(item=>item.shoppings!==undefined)
    .map(item=>item.shoppings.map(item=>item.valor).reduce((acc,item)=>acc+item,0)).reduce((acc,item)=>acc+item,0);
    dashboard.querySelector('.shopping-full').textContent='A0A '+allShoppings.toFixed(2).replaceAll('.',',') || '0,00';
    // console.log(allShoppings);
  }
  function getAllSales(){
    let allServices=users && users.filter(item=>item.Services!==undefined)
    .map(item=>item.Services.map(item=>item.valor).reduce((acc,item)=>acc+item,0)).reduce((acc,item)=>acc+item,0);
    let allShoppings=users && users.filter(item=>item.shoppings!==undefined)
    .map(item=>item.shoppings.map(item=>item.valor).reduce((acc,item)=>acc+item,0)).reduce((acc,item)=>acc+item,0);
    let allValorSales=allServices+allShoppings;
    dashboard.querySelector('.sales-full').textContent='A0A '+ allValorSales.toFixed(2).replaceAll('.',',') || '0,00';
  }
  function getDateToday(){
    const dateToday=dashboard.querySelector('h3 .date-today');
    let date= new Date();
    let day= date.getDate();
    let year=date.getFullYear();
    let month=date.getMonth();
    let monthName=['Jan','Fev','Mar','Abril','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    dateToday.textContent="de hoje: "+day+', '+monthName[month]+', '+year;
    dateToday.style.fontSize='1.4rem';
  }
  function getAllActivityToday(){
    const shopsToday=dashboard.querySelector('.content-activity .shoppings-recents');
    const servsToday=dashboard.querySelector('.content-activity .service-recents');
    const salesToday= dashboard.querySelector('.content-activity .sales-recents');
    const date= new Date().toLocaleDateString();

    let allServices=users && users.filter(item=>item.Services!==undefined).map(item=>item.Services.filter(item=>item.datanow==date));
    let quantityServices=allServices.map(item=>item.length).reduce((acc,item)=>acc+item,0);
    servsToday.textContent=quantityServices || '0';

    let allShoppings=users && users.filter(item=>item.shoppings!==undefined).map(item=>item.shoppings.filter(item=>item.date==date));
    let quantityShoppings=allShoppings.map(item=>item.length).reduce((acc,item)=>acc+item,0);
    shopsToday.textContent=quantityShoppings || '0';

    let allValorServ=allServices.map(item=>item.map(item=>item.valor).reduce((acc,item)=>acc+item,0)).reduce((acc,item)=>acc+item,0);
    let allValorShopps=allShoppings.map(item=>item.map(item=>item.valor).reduce((acc,item)=>acc+item,0)).reduce((acc,item)=>acc+item,0);
    let allSalesToday=allValorServ+ allValorShopps;
    salesToday.textContent='A0A '+allSalesToday.toFixed(2).replaceAll('.',',') || '0,00';
  }
  
  getAllUsers();
  getAllSalesShopping();
  getAllSalesReservas();
  getAllSales();
  getDateToday();
  getAllActivityToday();
  // console.log(dashboard);
}

}