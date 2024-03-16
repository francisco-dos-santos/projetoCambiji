export default function eyestoggle(eye,senha){
  if(senha.type ==="password"){
    senha.setAttribute("type","text");
    eye.setAttribute("src","../assets/imagens/icons8_hide.ico")
  }else{
    senha.setAttribute("type","password");
    eye.setAttribute("src","../assets/imagens/icons8_eye.ico")
  }
}