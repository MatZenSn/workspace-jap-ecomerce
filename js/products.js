//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var currentProductsArray = [];

document.addEventListener("DOMContentLoaded", function (e){

    
    //creo funcion para mostrar los producos
    function showProductsList(array){ 


        for(let i = 0; i < currentProductsArray.length; i++){ // Utilizo un for para recorrer el array recibido
            let product = currentProductsArray[i];
            //Lo siguiente agrega la infrmacion al div con la id "product-list-container" con sus clases de bootstrap correspondientes
            document.getElementById("product-list-container").innerHTML += ` 
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name +`</h4>
                                <small class="text-muted">` + product.soldCount + ` artículos</small>
                            </div>
                            <p class="mb-1">` + product.description + `</p> <br
                        
                            
                            <div> <b>` +  product.currency + product.cost + `</b> </div>
                            
                        </div>
                    </div>
                </a>
                `
            }
    
            
            
        };


        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(result){ // Utilizo getJSONData creada en init.js
            if (result.status === "ok"){
                currentProductsArray = result.data
                showProductsList(result);} //Llamo la funcion creada mas arriba
            })

})
