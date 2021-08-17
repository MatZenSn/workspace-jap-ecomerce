//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ 

      var  mail = document.getElementById("mail")
       var password = document.getElementById("password")
    document.getElementById("butonLogin").addEventListener("click",function(){
        if(mail.value != "" || password.value != ""){
        location.replace("inicio.html")}
    })

    
});