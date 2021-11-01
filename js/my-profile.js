//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var dataProfile = {
  name: "",
  surname: "",
  age: "",
  email: "",
  phone: "",
  img: ""
};

function saveChanges() {
  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  dataProfile.name = name;
  dataProfile.surname = surname;
  dataProfile.age = age;
  dataProfile.email = email;
  dataProfile.phone = phone;
  dataProfile.img = document.getElementById("imgUser").src

  window.localStorage.setItem("dataProfile", JSON.stringify(dataProfile));

  document.getElementById("succesAlert").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
 Los cambios se han guardado correctamente.
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`

  showDataProfile();

}

function previewFile() {
  var preview = document.querySelector('img');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }


}

function showDataProfile() {
  let data = JSON.parse(localStorage.getItem("dataProfile"));

  if (JSON.parse(localStorage.getItem("dataProfile")) !== null) {

    document.getElementById("name").value = data.name;
    document.getElementById("surname").value = data.surname;
    document.getElementById("age").value = data.age;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("nameTittle").innerHTML = data.name + " " + data.surname;
    document.getElementById("imgUser").src = data.img;
  }

}

document.addEventListener("DOMContentLoaded", function (e) {


  showDataProfile();


});