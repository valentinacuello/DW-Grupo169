var datosDelPerfil = {};
var datosCuenta = {};


//guardando los datos

function guardarDatos(){
    let primerNombre = document.getElementById("nombre1").value;
    let segundoNombre = document.getElementById("nombre2").value;
    let primerApellido = document.getElementById("apellido1").value;
    let segundoApellido = document.getElementById("apellido2").value;
    let fechaNacimiento = document.getElementById("cumpleaños").value;
    let telefono = document.getElementById("telefono").value;
    
    datosDelPerfil = {
        nombre1: primerNombre,
        nombre2: segundoNombre,
        apellido1: primerApellido,
        apellido2: segundoApellido,
        cumpleanios: fechaNacimiento,
        telefono: telefono
    };

    let datosDelPerfilString = JSON.stringify(datosDelPerfil);
    localStorage.setItem("datosUsuario", datosDelPerfilString);
    
};


//mostrar los datos

function mostrarDatos(){
    let datosTxt = localStorage.getItem("datosUsuario");
    datosDelPerfil = JSON.parse(datosTxt);

    if(datosDelPerfil != null){
        document.getElementById("nombre1").value = datosDelPerfil.nombre1;
        document.getElementById("nombre2").value  = datosDelPerfil.nombre2;
        document.getElementById("apellido1").value = datosDelPerfil.apellido1;
        document.getElementById("apellido2").value = datosDelPerfil.apellido2;
        document.getElementById("cumpleaños").value = datosDelPerfil.cumpleanios;
        document.getElementById("telefono").value = datosDelPerfil.telefono;     
    }    
};

//guardar datos de la cuenta

function guardarDatosCuenta(){
    let email = document.getElementById("email").value;
    let nombreUser = document.getElementById("nombreUsuario2").value;

    localStorage.setItem("datosCuenta", email); 
    localStorage.setItem("nombre", nombreUser); // esto es para cambiar el valor del nombre de usuario

    document.getElementById("nombreUsuario").innerHTML =  `<i class="fas fa-user-circle icono-usuario"></i>` + nombreUser;
};

//mostrar datos de la cuenta

function mostrarDatosCuenta(){
    let datosCuentaTxt = localStorage.getItem("datosCuenta");
    
    document.getElementById("email").value = datosCuentaTxt;    
};


function setreadOnlyInputsPerfil(isreadOnly){
    document.getElementById("nombre1").readOnly = isreadOnly;
    document.getElementById("nombre2").readOnly = isreadOnly;
    document.getElementById("apellido1").readOnly = isreadOnly;
    document.getElementById("apellido2").readOnly = isreadOnly;
    document.getElementById("cumpleaños").readOnly = isreadOnly;
    document.getElementById("telefono").readOnly = isreadOnly;
}

function setReadOnlyUser(isreadOnly){
    document.getElementById("nombreUsuario2").readOnly = isreadOnly;
    document.getElementById("email").readOnly = isreadOnly;
}



document.addEventListener("DOMContentLoaded", function (e) {

    //quitar el readOnly para poder editar
    document.getElementById("btn-cambiar").addEventListener("click", function(e){
        setreadOnlyInputsPerfil(false);
    });

    //guardar datos usuario
    document.getElementById("btn-guardar").addEventListener("click", function(e){
        e.preventDefault();
        guardarDatos();
        setreadOnlyInputsPerfil(true);
        
        //muestra modal de éxito
        document.querySelector(".modal-container-exito").style.display = "flex";
    });



    //---------Datos de la cuenta-----------//

    document.getElementById("btn-cambiar-datos-cuenta").addEventListener("click", function(e){
        setReadOnlyUser(false);
    });

    //nombre usuario input
    document.getElementById("nombreUsuario2").value = localStorage.getItem("nombre");
    

    //guardar datos cuenta
    document.getElementById("btnGuardarDatosDuenta").addEventListener("click", function(e){
        e.preventDefault();
        guardarDatosCuenta();   
        setReadOnlyUser(true);
        
        //muestra modal de éxito    
        document.querySelector(".modal-container-exito").style.display = "flex";
    }); 
    

    
    document.getElementById("btnCerrarExito").addEventListener("click", function(){
        document.querySelector(".modal-container-exito").style.display = "none";
    });
    
    mostrarDatos();    
    mostrarDatosCuenta()
});