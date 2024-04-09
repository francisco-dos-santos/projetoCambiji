console.log('parte do user');
fetch("./users.json")
.then((response)=>{
  return response.json();
})
.then((data)=>{
  if(localStorage.getItem('BD_Users')==null){
    localStorage.setItem("BD_Users",JSON.stringify(data));
  }
});


  const products=JSON.parse(localStorage.getItem('BD_products'))??[];
  const containerOfortDay=document.getElementById("ofert-day");
  const containerProducts=document.getElementById("produt-recomed");
  const cronoment=document.getElementById("time");
  // console.log(products);
  function renderProducts(){
    let countp=0;
    containerOfortDay.innerHTML="";
    containerProducts.innerHTML="";
    products.forEach((element, index)=>{
      if(element.status){
        let newCard=`
      <div class="card descendo">
        <div class="cont-img" onclick=salveIdProduct(${element.id})>
          <img src="${element.imageProduct}" alt="produto-${index+1}">
          <div class="percentage" id="porcent">70%</div>
        </div>
        <h3 class="preco">Kz ${element.priceNew}.00</h3>
        <del class="text-riscado">Kz ${element.price}.00</del>
        <p>${element.product}</p>
        <div class="content">
          <small class="categoria">${element.category}</small>
          <button class="add-cart" onclick=goLodin()>
            <img src="./assets/imagens/icons8_add_shopping_cart.ico" width:16px; alt="cart">
          </button>
        </div>
    </div>
    `;
    containerOfortDay.innerHTML+=newCard;
      }else{
        if(countp!==18){
          let newCard=`
        <div class="card subindo">
          <div class="cont-img">
            <img src="${element.imageProduct}" alt="produto-${index+1}"onclick=salveIdProduct(${element.id}) >
            <!--<div class="percentage" id="porcent">60%</div>-->
          </div>
          <h3 class="preco">Kz ${element.price}.00</h3>
          <!--<del class="text-riscado">Kz${element.price}</del>-->
          <p>${element.product}</p>
          <div class="content">
            <small class="categoria">${element.category}</small>
            <button class="add-cart">
              <img src="./assets/imagens/icons8_add_shopping_cart.ico"" 
              alt="cart" onclick=goLodin()>
            </button>
          </div>
      </div>
      `;
      containerProducts.innerHTML+=newCard;
      countp++;
        }
      }

    });

  }
  
  setTimeout(()=>{
    renderProducts();
  },1500)
  function goLodin(){
    window.location.href="./pages/login.html";
  }
  containerOfortDay.innerHTML=`
  <div style="width:90vw;text-align:center;"> 
    <img src="./assets/imagens/init-loading.gif" alt="icone de loading"></img>
  </div>`;
  containerProducts.innerHTML=`<h3 
  <div style="width:90vw;text-align:center;"> 
    <img src="./assets/imagens/init-loading.gif" alt="icone de loading"></img>
  </div>`;

