
const products = JSON.parse(localStorage.getItem('BD_products')) ?? [];
const aromas = document.querySelector('#container-aromas .contents-product');
const sabonete = document.querySelector("#container-sabonetes .contents-product");
const dezodorizante = document.querySelector("#container-dezodorizantes .contents-product");
const miniatura = document.querySelector("#container-miniaturas .contents-product");
const creme = document.querySelector("#container-cremes .contents-product");
const oleo = document.querySelector("#container-oleos .contents-product");
console.log(aromas)
// functions
function renderPoducts() {
  let counta= 0;
  let counts= 0;
  let countd= 0;
  let countm= 0;
  let countc= 0;
  let counto= 0;
  aromas.innerHTML = "";
  sabonete.innerHTML = "";
  dezodorizante.innerHTML = "";
  miniatura.innerHTML = "";
  creme.innerHTML = "";
  oleo.innerHTML = "";
  products.forEach(element => {
    let newCard = `
    <div class="card subindo">
      <div class="cont-img">
        <img src="../assets/${element.imageProduct}" alt="produto-1"onclick=salveIdProduct(${element.id}) >
        <!--<div class="percentage" id="porcent">60%</div>-->
      </div>
      <h3 class="preco">A0A ${element.price}.00</h3>
      <!--<del class="text-riscado">Kz${element.price}</del>-->
      <p>${element.product}</p>
      <div class="content">
        <small class="categoria">${element.category}</small>
        <button class="add-cart">
          <img src="../assets/imagens/icons8_add_shopping_cart.ico"" alt="cart" onclick=addCart(${element.id})>
        </button>
      </div>
  </div>
  `;
    if (element.category === 'Aromas' && counta <10) {
      aromas.innerHTML += newCard;
      counta++;
    }
    if (element.category === 'Dezodorizante' && countd<=10) {
      dezodorizante.innerHTML += newCard;
      countd++;
    }
    if (element.category === 'Sabonete' && counts <=10) {
      sabonete.innerHTML += newCard;
      counts++;
    }
    if (element.category === 'Miniatura' && countm <=10) {
      miniatura.innerHTML += newCard;
      countm++;
    }
    if (element.category === 'Creme' && countc <=10) {
      creme.innerHTML += newCard;
      countc++;
    }
    if (element.category === 'Oleo' && counto <=10) {
      oleo.innerHTML += newCard;
      counto++;
    }
  });
}
// functions execute
setTimeout(() => {
  renderPoducts();
}, 1500)