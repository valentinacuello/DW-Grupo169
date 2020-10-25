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
    localStorage.setItem('nombre', usuario); //nombre es el nombre de la variable y usuario es el contenido que se escriba adentro de ese input
    document.getElementById("nombreUsuario").innerHTML = document.getElementById("nombreUsuario").innerHTML + usuario;
}

