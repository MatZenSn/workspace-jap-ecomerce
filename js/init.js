const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
//Funcion que agrega el menu desplegable al navBar. Si no hay un item user en el localStorage, crea un enlace a la pantalla del login.
function addNameDropDown(){
  let htmlContentToAppend = "";

  if(localStorage.getItem("user") !== null){
    
      htmlContentToAppend += `<div class="dropdown">
    <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+localStorage.getItem("user")+`
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="cart.html">Mi carrito</a>
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" id="logOut">Cerrar Sesión</a>
    </div>
  </div>`
  }
  else if(localStorage.getItem("user") == null){
    {
      htmlContentToAppend += `<a class="py-2 d-none d-md-inline-block" href="index.html">Iniciar sesión</a>`}
    }
  

          

                      
  document.getElementById("addNameDropDown").innerHTML += htmlContentToAppend;
}
//Funcion que remueve el item y redirije a pantalla de login.
function logOut(){
  localStorage.removeItem("user");
  window.location.replace("index.html");
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  addNameDropDown();

  document.getElementById("logOut").addEventListener("click", function(){
    logOut();
  })
});