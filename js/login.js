//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});


function submitLogin(event){
    event.preventDefault();
    ocultarLogin();
    localStorage.setItem('logeado', 'true');

    var usuario = document.getElementById("inputUsuario").value;
    localStorage.setItem('nombre', usuario);
    document.getElementById("nombreUsuario").innerHTML = usuario;
}

