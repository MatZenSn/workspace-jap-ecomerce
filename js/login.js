//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ 

      var  mail = document.getElementById("mail")//Valor en el campo de Correo  del formulario
       var password = document.getElementById("password")//Valor en el campo contraseña del formulario
    document.getElementById("butonLogin").addEventListener("click",function(){
        if(mail.value != "" || password.value != ""){ //Si los campos son diferentes de nada ejecuta location.replace, que redirije sin permitir volver atras con el boton de back del navegador.
        location.replace("inicio.html")}
    })

    
});