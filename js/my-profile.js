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

    localStorage.setItem("datosCuenta", email); 
    localStorage.setItem("nombre", document.getElementById("nombreUsuario2").value);
};

//mostrar datos de la cuenta

function mostrarDatosCuenta(){
    let datosCuentaTxt = localStorage.getItem("datosCuenta");
    
    document.getElementById("email").value = datosCuentaTxt;
    
};



document.addEventListener("DOMContentLoaded", function (e) {
    //guardar datos usuario
    document.getElementById("btn-guardar").addEventListener("click", function(e){
        e.preventDefault();
        guardarDatos();
        
        //muestra modal de éxito
        document.querySelector(".modal-container-exito").style.display = "flex";
    });


    //nombre usuario input
    document.getElementById("nombreUsuario2").value = localStorage.getItem("nombre");
    

    //guardar datos cuenta
    document.getElementById("btnGuardarDatosDuenta").addEventListener("click", function(e){
        e.preventDefault();
        guardarDatosCuenta();   
        
        //muestra modal de éxito    
        document.querySelector(".modal-container-exito").style.display = "flex";
    }); 
    
    
    document.getElementById("btnCerrarExito").addEventListener("click", function(){
        document.querySelector(".modal-container-exito").style.display = "none";
    });
    
    mostrarDatos();    
    mostrarDatosCuenta()
});