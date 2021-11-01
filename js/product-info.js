//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var commentsArray = {};
var prueba = {};


function showImagesGallery(array){

    let htmlContentToAppend ="";
    
    for(let i = 0; i < (array.length); i++){
        let listaDeImagenes = product.images[i];

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
    
function sortComments(array){
     
        array.sort(function (a, b) {
            if ( a.dateTime < b.dateTime ){ return -1; }
            if ( a.dateTime > b.dateTime ){ return 1; }
            return 0
        });
        commentsSort= array;
}

function addNewComment(){
    rateComment = document.getElementById("rate").value;
    comment = document.getElementById("comment").value;
    user = localStorage.getItem("user");
    dateNewComment = new Date();
    dateTime = dateNewComment.getFullYear()+"-"+(dateNewComment.getMonth()+1)+"-"+dateNewComment.getDate() +" "+ dateNewComment.getHours()+":"+dateNewComment.getMinutes()+":"+dateNewComment.getSeconds();
    if((rateComment <= 5) && (comment != "")){
        htmlContentToAppend = `<div class="row"><div class="col"><div class="d-flex w-100 justify-content-between">
        <h6 class="font-weight-bold">`+user+` <span class="ml-2">`+rateComment+`/5</span></h6>
        <small class="text-muted">`+dateTime+`</small></div>
        <p class="mb-3">`+comment+`</p></div></div>
        <hr class="mt-0">`

        document.getElementById("comments").innerHTML += htmlContentToAppend;

        rateComment = "";
        comment = "";
    }
    
    
}

function showRelatedProducts(){ 

    let htmlContentToAppend = "";
    for(let i = 0; i < product.relatedProducts.length; i++){ 
        
        let productRelated = prueba[(product.relatedProducts[i])]

                htmlContentToAppend +=`<div class="card" style="width: 18rem; margin-left: 10px;">
                <img class="card-img-top" src="`+ productRelated.imgSrc +`" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">`+ productRelated.name +`</h5>
                <p class="card-text">`+ productRelated.description +`</p>
                <a href="product-info.html" class="btn btn-secondary">Ver Producto</a>
                </div>
                </div>` 

        }
        
        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
    }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            
            showProductInfo(product);
           
            showImagesGallery(product.images);
        }
    }).then( getJSONData(PRODUCTS_URL).then(function(resultArreglo){ 
        if (resultArreglo.status === "ok"){
            prueba = resultArreglo.data
            showRelatedProducts()
        } 
    }));

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(result){
        if (result.status === "ok"){
        commentsArray = result.data;
        sortComments(commentsArray);
        showComments(commentsSort);
        
    }
    });

    document.getElementById("buttonSendComment").addEventListener("click", function(){
        addNewComment();
    })

   

});

