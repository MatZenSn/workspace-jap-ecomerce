//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ 

    document.getElementById("buttonLogin").addEventListener("click",function(){
        
      var  user = document.getElementById("user").value
      var password = document.getElementById("password").value
      
        if(user != "" && password != ""){ //Si los campos son diferentes de nada ejecuta location.replace, que redirije sin permitir volver atras con el boton de back del navegador.
        location.replace("inicio.html")}
        else alert("Debes completar ambos campos.")
    })

    
});