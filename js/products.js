//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var currentProductsArray = [];

document.addEventListener("DOMContentLoaded", function (e){

    
    
    function showProductsList(array){ 


        for(let i = 0; i < currentProductsArray.length; i++){
            let product = currentProductsArray[i];
    
            document.getElementById("product-list-container").innerHTML += `
                <a href="category-info.html" class="list-group-item list-group-item-action">
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
                        
                            
                            <div class="">` +  product.currency + product.cost + ` </div>
                            
                        </div>
                    </div>
                </a>
                `
            }
    
            
            
        };


        getJSONData("https://japdevdep.github.io/ecommerce-api/product/all.json").then(function(result){
            if (result.status === "ok"){
                currentProductsArray = result.data
                showProductsList(result);}
            })

})
