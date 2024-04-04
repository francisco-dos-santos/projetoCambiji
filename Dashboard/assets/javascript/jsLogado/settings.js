import { Products } from "./classProducts.js";
import{setError,setSucess}from '../functionsSet&Get_Error.js';
import { Modal} from "./modal.js";

export default function initSettings(){
const setting = document.getElementById("setting");

if(setting){
  function initTab(){
    const buttons= setting.querySelectorAll('.asidebar-setting > button');
    const contents= setting.querySelectorAll('.container-setting > article');
    buttons[0].classList.add('ativo');
    contents[0].classList.add('ativo');

    function ativeTab(button){
      buttons.forEach(button=>button.classList.remove('ativo'));
      contents.forEach(content=>content.classList.remove('ativo'));
      button.classList.add('ativo');
      if(button.classList.contains('ativo')){
        const Id=button.getAttribute('content_Id');
        const contentTarget= document.getElementById(Id);
        contentTarget.classList.add('ativo');
      }
    }

    buttons.forEach(button=>{
      button.addEventListener('click',()=>{
        ativeTab(button);
      })
    });
  }
  function showfields(){
    const wrapperPrNormal=document.getElementById('content-normal');
    const wrapperPrDeals= document.getElementById('content-deals');
    const inputsSwitch= document.querySelectorAll('.wrapper-input-switch input[type="radio"]');
    // console.log(inputsSwitch);
    inputsSwitch.forEach(input=>{
      input.addEventListener('change',function(e){
        if(e.target.value=="deals"){
          wrapperPrDeals.classList.toggle('show-deals-normal');
          wrapperPrNormal.classList.toggle('show-deals-normal');
        }else{
          wrapperPrDeals.classList.toggle('show-deals-normal');
          wrapperPrNormal.classList.toggle('show-deals-normal');
        }
      });
    });
  }
  function iniWorkForAddProduct(){
    const buttonAddProd= document.getElementById('btn-add-products');
    let image;

    function getImage(){
      const pictureInput = document.getElementById("picture-input");
      const picturePrevious= document.getElementById('picture-previous');
      pictureInput.addEventListener("change",(event) => {
        const file = event.target.files[0];
        if(file){
          const read = new FileReader();
  
          read.addEventListener("load",(e)=>{
            const readTarget = e.target;
            image = readTarget.result;
            picturePrevious.setAttribute("src","");
            picturePrevious.setAttribute("src",`${image}`);
            picturePrevious.classList.add('onload');
          });
          read.readAsDataURL(file);
        }else{
          picturePrevious.classList.remove('onload');
          picturePrevious.setAttribute("src", "");
          picturePrevious.setAttribute("src", `.././assets/imagens/icons8-fats-64.png`);
          return image=false;
        }
      });
      return image;
    }
    function validatyFieldsNormal({
      nameProductInput,descriptionInput,priceInput,
      categoryInput,markInput,sizeInput,stockInput
    }){
 
      let nameProductValue= nameProductInput.value.trim();
      let descriptionValue=descriptionInput.value.trim();
      let priceValue=priceInput.value.trim();
      let categoryValue=categoryInput.value.trim();
      let markValue=markInput.value.trim();
      let sizeValue=sizeInput.value.trim();
      let stockValue=stockInput.value.trim();

      if(nameProductValue===""){
        setError(nameProductInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(nameProductInput);
      }

      if(descriptionValue===""){
        setError(descriptionInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(descriptionInput);
      }

      if(priceValue===""){
        setError(priceInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(priceInput);
      }

      if(categoryValue===""){
        setError(categoryInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(categoryInput);
      }

      if(markValue===""){
        setError(markInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(markInput);
      }

      if(sizeValue===""){
        setError(sizeInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(sizeInput);
      }

      if(stockValue===""){
        setError(stockInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(stockInput);
      }

      return true
    }
    function validatyFieldsDeals(
      {
        nameProductInput,descriptionInput,priceOldInput,
        priceNewInput,categoryInput,markInput,sizeInput,stockInput
      }
      ){

      let nameProductValue= nameProductInput.value.trim();
      let descriptionValue=descriptionInput.value.trim();
      let priceOldValue=priceOldInput.value.trim();
      let priceNewValue=priceNewInput.value.trim();
      let categoryValue=categoryInput.value.trim();
      let markValue=markInput.value.trim();
      let sizeValue=sizeInput.value.trim();
      let stockValue=stockInput.value.trim();

      if(nameProductValue===""){
        setError(nameProductInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(nameProductInput);
      }

      if(descriptionValue===""){
        setError(descriptionInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(descriptionInput);
      }

      if(priceOldValue===""){
        setError(priceOldInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(priceOldInput);
      }

      if(priceNewValue===""){
        setError(priceNewInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(priceNewInput);
      }

      if(categoryValue===""){
        setError(categoryInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(categoryInput);
      }

      if(markValue===""){
        setError(markInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(markInput);
      }

      if(sizeValue===""){
        setError(sizeInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(sizeInput);
      }

      if(stockValue===""){
        setError(stockInput,'Campo é Obrigatório');
        return
      }else{
        setSucess(stockInput);
      }

      return true
    }
    
    function handleClickAddProduct(event){
      event.preventDefault();
      const warnImage=setting.querySelector('.container-image> .warn-data');
      const filedsetWrapper = document.querySelector('fieldset > .fieldset-wrapper.show-deals-normal');
      const nameProductInput= filedsetWrapper.querySelector('.wrapper-input> #name-product');
      const descriptionInput= filedsetWrapper.querySelector('.wrapper-input> #desc-product');
      const priceInput= filedsetWrapper.querySelector('.wrapper-input> #price-product');

      const priceOldInput = filedsetWrapper.querySelector('.wrapper-input> #price-old-product');
      const priceNewInput = filedsetWrapper.querySelector('.wrapper-input> #price-new-product');

      const categoryInput = filedsetWrapper.querySelector('.wrapper-input> #category-product');
      const markInput = filedsetWrapper.querySelector('.wrapper-input> #marker-product');
      const sizeInput = filedsetWrapper.querySelector('.wrapper-input> #size-product');
      const stockInput = filedsetWrapper.querySelector('.wrapper-input> #stock-product');


      if(image){
        warnImage.classList.add('hide-warn');
        let isDealsField =filedsetWrapper.getAttribute('id');
        if(isDealsField==='content-deals'){
        
          if(validatyFieldsDeals({nameProductInput,descriptionInput,priceOldInput,
            priceNewInput,categoryInput,markInput,sizeInput,stockInput}))
          {
            console.log(image);
            console.log(isDealsField);
            Products.addProductDeals(
              { 
                priceNew:priceNewInput.value,
                product:nameProductInput.value,
                price:priceOldInput.value,
                category:categoryInput.value,
                description:descriptionInput.value,
                imageProduct:image,
                stock:stockInput.value,
                mark:markInput.value,
                size:sizeInput.value
              })
          }
        }else{

          if(validatyFieldsNormal({nameProductInput,descriptionInput,priceInput,
            categoryInput,markInput,sizeInput,stockInput}))
          {
            // console.log(isDealsField);
            Products.addProduct(
              {
                product:nameProductInput.value,
                price:priceInput.value,
                category:categoryInput.value,
                description:descriptionInput.value,
                imageProduct:image,
                stock:stockInput.value,
                mark:markInput.value,
                size:sizeInput.value
              });

          }
        } 
      }else{
        warnImage.classList.remove('hide-warn');
      }
      
    }


    buttonAddProd.addEventListener('click',handleClickAddProduct);

    document.body.onload=getImage();
  }
  initTab();
  showfields();
  iniWorkForAddProduct();
  
}

}