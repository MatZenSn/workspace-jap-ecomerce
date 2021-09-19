//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var commentsArray = {};
function showImagesGallery(array){

    let htmlContentToAppend ="";
    
    for(let i = 0; i < (array.length); i++){
        const listaDeImagenes = product.images[i];

        htmlContentToAppend = `<div class="carousel-item"><img src="${listaDeImagenes}" class="d-block w-100" alt="Imagen del producto"></div>`
        

        document.getElementById("imagenes").innerHTML += htmlContentToAppend;
    }
        document.getElementsByClassName("carousel-item")[0].className+= " active"

}

function showProductInfo(array){
    
            let productNameHTML  = document.getElementById("productName");
            let productCategoryHTML = document.getElementById("productCategory");
            let productPrice = document.getElementById("productPrice");
            let productSoldCount = document.getElementById("productSoldCount");
            let productDescription = document.getElementById("productDescription")
            
        
            productNameHTML.innerHTML = product.name; 
            productCategoryHTML.innerHTML += '<a href="" > ' +product.category +'</a>';
            productPrice.innerHTML += product.currency +" "+ product.cost;
            productSoldCount.innerHTML += product.soldCount + " Articulos vendidos";
            productDescription.innerHTML +=  product.description 

}


function showComments(array){

        let htmlContentToAppend ="";

        for(let i = 0; i < (array.length); i++){
            let comment = array[i]

            htmlContentToAppend += `<div class="row"><div class="col"><div class="d-flex w-100 justify-content-between">
            <h6 class="font-weight-bold">`+comment.user+` <span class="ml-2">`+comment.score+`/5</span></h6>
            <small class="text-muted">`+comment.dateTime+`</small></div>
            <p class="mb-3">`+comment.description+`</p></div></div>
            <hr class="mt-0">`
    
        }
    
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
    




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            
            showProductInfo(product);
           
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(result){
        if (result.status === "ok"){
        commentsArray = result.data;
        showComments(commentsArray);
    }
    });

});