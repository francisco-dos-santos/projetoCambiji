console.log('testando');
let response=`[
  {
    "id":0,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":3000,
    "category":"Aromas",
    "quantity":1
  },
  {
    "id":1,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":3000,
    "quantity":1
  },
  {
    "id":2,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":3000,
    "quantity":1
  },
  {
    "id":3,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":5000,
    "quantity":1
  },
  {
    "id":4,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":4500,
    "quantity":1
  },
  {
    "id":5,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":1500,
    "quantity":1
  },
  {
    "id":6,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":2500,
    "quantity":1
  },
  {
    "id":7,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":2500,
    "quantity":1
  },
  {
    "id":8,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":500,
    "quantity":1
  },
  {
    "id":9,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":1800,
    "quantity":1
  },
  {
    "id":10,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":400,
    "quantity":1
  },
  {
    "id":11,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":2000,
    "quantity":1
  },
  {
    "id":12,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":2200,
    "quantity":1
  },
  {
    "id":13,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":1500,
    "quantity":1
  },
  {
    "id":15,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":3500,
    "quantity":1
  },
  {
    "id":16,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":2500,
    "quantity":1
  },
  {
    "id":17,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":2000,
    "quantity":1
  },
  {
    "id":18,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":500,
    "quantity":1
  },
  {
    "id":19,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":600,
    "quantity":1
  },
  {
    "id":20,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":700,
    "quantity":1
  },
  {
    "id":21,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":1000,
    "quantity":1
  },
  {
    "id":22,
    "imageProduct":"../assets/imagens/ponds-2.png",
    "product":"Pondes",
    "price":300,
    "quantity":1
  }
]`;

let datajson=JSON.parse(response);
  localStorage.setItem('BD_products',JSON.stringify(datajson));
  const products=JSON.parse(localStorage.getItem('BD_products'))??[];
  const containerOfortDay=document.getElementById("ofert-day");
  const containerProducts=document.getElementById("produt-recomed");
  console.log(products);

  function renderProducts(){
    let countf=0;
    let countp=0;
    containerOfortDay.innerHTML="";
    containerProducts.innerHTML="";
    products.forEach((element, index)=>{
      if(countf!==7){
        let newCard=`
      <div class="card">
        <div class="cont-img" onclick=salveIdProduct(${element.id})>
          <img src="${element.imageProduct}" alt="produto-1">
          <div class="percentage" id="porcent">60%</div>
        </div>
        <h3 class="preco">Kz${Number(element.price)/0.50.toFixed(2)}</h3>
        <del class="text-riscado">Kz${element.price}</del>
        <p>${element.product}</p>
        <div class="content">
          <small class="categoria">${element.category}</small>
          <button class="add-cart" onclick=addCart(${element.id})>
            <img src="" alt="cart">
          </button>
        </div>
    </div>
    `;
    containerOfortDay.innerHTML+=newCard;
    countf++;
      }

      if(countp!==21){
        let newCard=`
      <div class="card">
        <div class="cont-img">
          <img src="${element.imageProduct}" alt="produto-1"onclick=salveIdProduct(${element.id}) >
          <!--<div class="percentage" id="porcent">60%</div>-->
        </div>
        <h3 class="preco">Kz${Number(element.price)}</h3>
        <!--<del class="text-riscado">Kz${element.price}</del>-->
        <p>${element.product}</p>
        <div class="content">
          <small class="categoria">${element.category}</small>
          <button class="add-cart">
            <img src="" alt="cart" onclick=addCart(${element.id})>
          </button>
        </div>
    </div>
    `;
    containerProducts.innerHTML+=newCard;
    countp++;
      }
    });
  }
  setTimeout(()=>{
    renderProducts();
  },1500)
  containerOfortDay.innerHTML=`<h3 style="">buscando dados...</h3>`;
  containerProducts.innerHTML=`<h3 style="">buscando dados...</h3>`;

