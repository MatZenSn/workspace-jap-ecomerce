//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ 

    document.getElementById("buttonLogin").addEventListener("click",function(e){
        event.preventDefault()
        
        
      var  user = document.getElementById("user").value
      var password = document.getElementById("password").value

       localStorage.setItem("user", user);
      
        if(user != "" && password != ""){
            localStorage.setItem("user", user); //Si los campos son diferentes de nada ejecuta location.replace, que redirije sin permitir volver atras con el boton de back del navegador.
            location.replace("inicio.html")}
        else alert("Debes completar ambos campos.")
        
    })
})
