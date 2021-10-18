let cartProducts;
let sumaDeSubs = 0;


function calcularSubtotal() {
  const listaSubtotales = document.getElementsByClassName("subtotales");//crea lista de los subtotales de cada producto
  for (let i = 0; i < (listaSubtotales.length); i++) {
    sumaDeSubs += parseFloat((listaSubtotales[i].innerHTML))//suma y convierte a numero los subtotaltes de los productos danto lugar al subtotal al que posteriormente se le sumara el envio.
  }

  document.getElementById("subtotal").innerHTML = `${sumaDeSubs}`;
}

function multiplicarPrecio() {
  const listaImputs = document.getElementsByClassName("productCant");//clase agregada en los inputs de cantidad
  for (let listaElement of listaImputs) {
    listaElement.addEventListener("change", (event) => {//evento change que está atento a cualquier cambio en esos inputs
      let cantidad = parseFloat(event.target.value).toFixed(2);//se obtiene el valor del input desde donde se lanza el evento y redondea de ser necesario
      let cost = parseFloat(event.target.dataset.unitcost).toFixed(2);//se obtiene el preio unitario agregado en data-unitcost y redondea de ser necesario
      precioSubtotal = (cantidad * cost).toFixed(2);
      document.getElementById(event.target.dataset.idsubtotal).innerHTML = precioSubtotal //idsubtotal se agrego como dato al input para tenerlo a la alcance a raiz del evento y no tener que estar agregandole id´s dinamicas a todos
      calcularSubtotal();
      calcularPrecioDeEnvío();
      calcularTotal();
    })

  }


}

function calcularPrecioDeEnvío() {
  let envioTip = document.getElementById("tipoEnvio").value
  let sub = parseFloat(document.getElementById("subtotal").innerHTML).toFixed(2);
  if (envioTip == "EST") {
    precioEnvio = ((sub * 5) / 100)
    document.getElementById("costeEnvío").innerHTML =  precioEnvio
    calcularTotal();
  }
  else
    if (envioTip == "EXP") {
      precioEnvio = ((sub * 7) / 100)
      document.getElementById("costeEnvío").innerHTML = precioEnvio
      calcularTotal();
    } else
      if (envioTip == "PRE") {
        precioEnvio = ((sub * 15) / 100)
        document.getElementById("costeEnvío").innerHTML = precioEnvio
        calcularTotal();
      }


}

function calcularTotal() {
  let precioEnvio = parseFloat(document.getElementById("costeEnvío").innerHTML);
  let subtotal = parseFloat(document.getElementById("subtotal").innerHTML);

  total = subtotal + precioEnvio
  document.getElementById("precioTotal").innerHTML = "USD " + total;
}




function showCartProducts(array) {//for que recorre el array que nos viene del json,y lo agrega al html
  let append = "";
  for (let i = 0; i < (array.length); i++) {
    let art = array[i];
    if (art.currency == "UYU") { //Si viene en PESOS,(asumiendo que solo se envia informacion en dolares y pesos) lo convierte a DOLARES. EN EL FUTURO AGREGAR QUE SE PUEDA SELECCIONAR A GUSTO!
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
                  <input class="cart_item_text productCant form-control" min="1"  value="${art.count}" type="number" data-unitcost="${art.unitCost}" data-idsubtotal="subtotalProducto${i}"/>
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
                  <input class="cart_item_text productCant form-control" min="1" value="${art.count}" type="number" data-unitcost="${art.unitCost}" data-idsubtotal="subtotalProducto${i}"/>
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


    document.getElementById("listaCarrito").innerHTML = append;
  }
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