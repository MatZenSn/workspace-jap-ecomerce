let cartProducts;
let sumaDeSubs = 0;
var total = 0;
var precioEnvio = 0;
var subtotal = 0;
const listaImputs = document.getElementsByClassName("productCant");
let tiempoDeEnvio = "";

function showCartProducts(array) {//for que recorre el array que nos viene del json,y lo agrega al html
  let append = "";
  if (Array.length !== 0) {
    for (let i = 0; i < (array.length); i++) {
      let art = array[i];
      if (art.currency == "UYU") { //Si viene en PESOS,(asumiendo que solo se envia informacion en dolares y pesos) lo convierte a DOLARES. EN EL FUTURO AGREGARÉ QUE SE PUEDA SELECCIONAR A GUSTO!
        art.unitCost = (art.unitCost / 40.00)
        art.currency = "USD"

        //Uso de atributos de datos mencionado en clase, y tambien las id´s que cambian dependiendo el indice del objeto en la lista.
        append += `
            <li class="cart_item clearfix">
              <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
              
                <div class="cart_item_image cart_info_col ">
                  <img src="${art.src}" />
                </div>
                <div class="cart_item_quantity cart_info_col">
                  <div class="cart_item_title">${art.name}</div>
                  <input class="cart_item_text productCant form-control" min="0"  value="${art.count}" type="number" data-unitcost="${art.unitCost}" data-indice="${i}" data-idsubtotal="subtotalProducto${i}"/>
                </div>
                <div class="cart_item_price cart_info_col">
                  <div class="cart_item_title">Precio por unidad</div>
                  <div class="cart_item_text row"><p>${art.currency}</p><p class="col-6">${art.unitCost.toFixed(2)}</p></div>
                </div>
                <div class="cart_item_total cart_info_col">
                  <div class="cart_item_title">Precio</div>
                  <div class="cart_item_text row"><p> ${art.currency}</p><p class="col-6 subtotales" id="subtotalProducto${i}">${art.unitCost.toFixed(2) * art.count}</p></div>
                </div>
              </div>
            </li>
            
            
        `
      }
      else {
        append += `
            <li class="cart_item clearfix">
              <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
              
                <div class="cart_item_image cart_info_col ">
                  <img src="${art.src}" />
                </div>
                <div class="cart_item_quantity cart_info_col">
                  <div class="cart_item_title">${art.name}</div>
                  <input 
                  
                  class="cart_item_text productCant form-control" min="0" value="${art.count}" type="number" data-unitcost="${art.unitCost}" data-indice="${i}" data-idsubtotal="subtotalProducto${i}"/>
                </div>
                <div class="cart_item_price cart_info_col">
                  <div class="cart_item_title">Precio por unidad</div>
                  <div class="cart_item_text row"><p>${art.currency}</p><p class="col-6">${art.unitCost.toFixed(2)}</p></div>
                </div>
                <div class="cart_item_total cart_info_col">
                  <div class="cart_item_title">Precio</div>
                  <div class="cart_item_text row"><p> ${art.currency}</p><p class="col-6 subtotales" id="subtotalProducto${i}">${art.unitCost.toFixed(2)}</p></div>
                </div>
              </div>
            </li>
        `
      }
    }



    document.getElementById("listaCarrito").innerHTML = append;
  }

}

function multiplicarPrecio() {//Multiplica cantidad por precio unitario
  for (let listaElement of listaImputs) {
    listaElement.addEventListener("change", (event) => {//evento change que está atento a cualquier cambio en esos inputs
      if (event.target.value <= 0  ) {//Si la cantidad de productos llega a 0 lanza un modal para preguntar si se quiere eliminar el producto del carrito
        $('#eliminarProduct').modal('show');
        document.getElementById("removeButton").setAttribute("data-iProduct", event.target.dataset.indice);//Setea el indice del produto que lanza el modal para poder identificar el producto
      }
      else {
        let cantidad = parseFloat(event.target.value).toFixed(2);//se obtiene el valor del input desde donde se lanza el evento y redondea de ser necesario
        let cost = parseFloat(event.target.dataset.unitcost).toFixed(2);//se obtiene el preio unitario agregado en data-unitcost y redondea de ser necesario
        precioSubtotal = (cantidad * cost).toFixed(2);
        document.getElementById(event.target.dataset.idsubtotal).innerHTML = precioSubtotal //idsubtotal se agrego como dato al input para tenerlo a la alcance a raiz del evento y no tener que estar agregandole id´s dinamicas a todos
        cartProducts[event.target.dataset.indice].count = cantidad;
        calcularSubtotal();
        calcularPrecioDeEnvío();
        calcularTotal();
      } 
    })

  }


}

function calcularSubtotal() {//Calcula subtotal sumando los subtotales individuales de los productos
  const listaSubtotales = document.getElementsByClassName("subtotales");//crea lista de los subtotales de cada producto
  subtotal = 0;
  for (let i = 0; i < (listaSubtotales.length); i++) {
    subtotal += parseFloat((listaSubtotales[i].innerHTML))//suma y convierte a numero los subtotaltes de los productos danto lugar al subtotal al que posteriormente se le sumara el envio.
  }

  document.getElementById("subtotal").innerHTML = "Subtotal: USD " + subtotal;
}

function calcularPrecioDeEnvío() {//Calcula precio de envio dependiendo de cual se sekeccione
  let envioTip = document.getElementById("tipoEnvio").value;//Obtiene el envio deseado y calcula dependiendo del coste establecido para cada uno
  if (envioTip == "EST") {
    precioEnvio = ((subtotal * 5) / 100)
    document.getElementById("costeEnvío").innerHTML = "Coste de envío: USD " + precioEnvio;
    tiempoDeEnvio = "12 a 15 Dias";
    calcularTotal();
  }
  else
    if (envioTip == "EXP") {
      precioEnvio = ((subtotal * 7) / 100)
      document.getElementById("costeEnvío").innerHTML = "Coste de envío: USD " + precioEnvio;
      tiempoDeEnvio = "5 a 8 Dias";
      calcularTotal();
    } else
      if (envioTip == "PRE") {
        precioEnvio = ((subtotal * 15) / 100)
        document.getElementById("costeEnvío").innerHTML = "Coste de envío: USD " + precioEnvio;
        tiempoDeEnvio = "2 a 5 Dias";
        calcularTotal();
      }


}

function calcularTotal() {//Calcula total sumando precio de envio y subtotal
  total = subtotal + precioEnvio
  document.getElementById("precioTotal").innerHTML = "Total: USD " + total;
}

function removerItem() {//Remueve item del carrito
  let indice = document.getElementById("removeButton").dataset.iproduct;//Indice guardado mediante atributo de datos
  cartProducts.splice(indice, 1);//Lo remueve de la lista de productos
  $('#eliminarProduct').modal('hide');//cierra el modal
  showCartProducts(cartProducts);//Vuelve a mostrar el carrito y calcular todos los precios correspondientes
  multiplicarPrecio();
  calcularSubtotal();
  calcularPrecioDeEnvío();
  calcularTotal();
}

function noRemoverItem() {//No remueve el item del carrito y vuelve a setearle una cantidad al producto
  let indice = document.getElementById("removeButton").dataset.iproduct;
  cartProducts[indice].count = 1 //Le suma 1 a la cantidad de prductos, que para que se haya lanzado el modal, deberia ser cero.
  $('#eliminarProduct').modal('hide');//Cierra el modal
  showCartProducts(cartProducts);//Vuelve a mostrar el carrito y calcular todos los precios correspondientes
  multiplicarPrecio();
  calcularSubtotal();
  calcularPrecioDeEnvío();
  calcularTotal();


}

function selectPaymentMethod() {// Dependiendo del metodo de pago seleccionado, agrega un formulario con los campos correspondientes a cada uno.
  let method = document.getElementById("methodPayment").value;
  if (method == "card") {//Form para tarjeta de credito
    document.getElementById("methodPaymentSelected").innerHTML = `<div class="container mt-2">
    <form>
      <div class="form-group owner">
        <label>Nombre</label>
        <input type="text" class="form-control" id="nombreCard">
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Numero de tarjeta</label>
          <input type="text" class="form-control" id="cardNumber">
        </div>
        <div class="form-group col-md-3">
          <label>CVV</label>
          <input type="text" class="form-control" size="6" id="cvv">
        </div>
      </div>
  
      <label>Fecha de vencimiento</label>
      <div class="form-row" id="expiration-date">
        <div class="form-group col-md-4">
          <select class="form-control" id="expiration-date-month">
          <option value="00" disabled selected>Mes</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
          </select>
        </div>
     
      <div class="form-group col-md-4">
        <select class="form-control" id="expiration-date-year">
          <option value="20" disabled selected>Año</option>
          <option value="22"> 2022</option>
          <option value="23"> 2023</option>
          <option value="24"> 2024</option>
          <option value="25"> 2025</option>
          <option value="26"> 2026</option>
          <option value="27"> 2027</option>
        </select>
      </div>
      
  </div>
  
  
  </form>
  </div>`
  }
  if (method == "transfer") {//Form para transferencia bancaria
    document.getElementById("methodPaymentSelected").innerHTML = `
    <div class="container mt-2">
  <label>Numero de cuenta bancaria</label>
  <input type="text" class="form-control" id="bankAcc">
</div>`
  }

}

function validateShippingData() {//Validar los datos correspondientes al metodo de envio.
  let direccion = document.getElementById("direccion");
  let ciudad = document.getElementById("ciudad");
  let codigoPostal = document.getElementById("codigoPostal");
  let pais = document.getElementById("pais");

  direccion.classList.remove("is-invalid");//Por si alguno tenia la clase de invalido, se la quita para que no quede una vez que se ingresa ek dato
  ciudad.classList.remove("is-invalid");
  codigoPostal.classList.remove("is-invalid");
  pais.classList.remove("is-invalid");

  if (direccion.value !== "" && ciudad.value !== "" && codigoPostal.value !== "" && pais.value !== "00") {//Si ningun campo se encuentra vacio, lanza el modal
    $('#methodPaymentModal').modal('show');
  }

  else {//Si un campo se encuentra vacio, pregunta cúal es y le agrega la clase "is-invalid" de bootstrap
    if (direccion.value == "") { direccion.classList.add("is-invalid") }


    if (ciudad.value == "") {
      ciudad.classList.add("is-invalid")

    }
    if (codigoPostal.value == "") {
      codigoPostal.classList.add("is-invalid")

    }
    if (pais.value == "00") {
      pais.classList.add("is-invalid")

    }

  }

}

function validatePaymentData() {//Valida los datos de forma de pago
  let method = document.getElementById("methodPayment").value;

  if (method == "card") {//Si el metodo elegido es Con tarjeta de credito
    let nameCard = document.getElementById("nombreCard");
    let cardNumber = document.getElementById("cardNumber");
    let cvv = document.getElementById("cvv");
    let mesExp = document.getElementById("expiration-date-month");
    let yearExp = document.getElementById("expiration-date-year");

    nameCard.classList.remove("is-invalid");//Por si alguno tenia la clase de invalido, se la quita para que no quede una vez que se ingresa ek dato
    cardNumber.classList.remove("is-invalid");
    cvv.classList.remove("is-invalid");
    mesExp.classList.remove("is-invalid"); direccion.classList.remove("is-invalid");//Por si alguno tenia la clase de invalido, se la quita para que no quede una vez que se ingresa ek dato
    yearExp.classList.remove("is-invalid");

    if (nameCard.value !== "" && cardNumber.value !== "" && cvv.value !== "" && mesExp.value !== "00" && yearExp.value !== "20") {//Valida que ningun campo se encuentre vacio o en un value de placeholder.
      document.getElementById("finishCompra").innerHTML = '<button class="btn btn-succes" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></button>'//Agrego animacion de carga luego de validar los campos
      compraFinalizada();
    }
    else {//Si un campo se encuentra vacio, pregunta cúal es y le agrega la clase "is-invalid" de bootstrap
      if (nameCard.value == "") {
        nameCard.classList.add("is-invalid")
      }
      if (cardNumber.value == "") {
        cardNumber.classList.add("is-invalid")
      }
      if (cvv.value == "") {
        cvv.classList.add("is-invalid")
      }
      if (mesExp.value == "00") {
        mesExp.classList.add("is-invalid")
      }
      if (yearExp.value == "20") {
        yearExp.classList.add("is-invalid")
      }
    }
  }

  if (method == "transfer") {//IDEM que con tarjeta
    let acc = document.getElementById("bankAcc");

    if (acc.value !== "") {
      document.getElementById("finishCompra").innerHTML = '<button class="btn btn-succes" type="button" disabled><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only">Loading...</span></button>'
      compraFinalizada();
    }
    else {
      acc.classList.add("is-invalid");
    }
  }
}

function compraFinalizada() {//Funcion que se ejecuta una vez validado los datos de forma de pago


  setTimeout(function () {//El timeout es para darle tiempo(1.5 s) a que se veva la animacion de carga en el botón
    $('#methodPaymentModal').modal('hide');//Oculta modal de forma de pago
    $('#finishModal').modal({ backdrop: 'static', keyboard: false });//Evita que el modal de compra finalizada se pueda cerrar con ESC o clickeando fuera del modal
    $('#finishModal').modal('show');//Muestra el modal de compra finalizada

    document.getElementById("tiempoEnvio").innerHTML = "Su pedido le llegará en un periodo de " + tiempoDeEnvio + ".";//Agrego cuanto tiempo aproximado le tardara en llegar el producto
    document.getElementById("numeroDeOrden").innerHTML = "Numero de orden: " + Math.floor(100000 + Math.random() * 900000);//Genero un numero aleatorio que funciona como "Numero de orden"
  }, 1500)


}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(result => {
      if (result.status === "ok") {
        cartProducts = result.data.articles;
        showCartProducts(cartProducts);
        multiplicarPrecio();
        calcularSubtotal();
        calcularPrecioDeEnvío();
        calcularTotal();
      }
    })


})