//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var itemCarrito = {};
var metodoPago = "";
var subTotal = document.getElementById("subtotalNumero");
var totalEnvio = 0;



function carritoDeCompras(){
  let htmlContentToAppend = "";
  
  if (itemCarrito.articles.length === 0){
    htmlContentToAppend += `
    <tr id="trNoHay">
      <td id="tdNoHay" colspan="4">
        <div class="no-hay-items">
            <i class="fas fa-shopping-cart cart"></i>
            <p id="noHayElementos">No hay elementos en el carrito</p>
            <a href="index.html" id="btnHome">Volver al home</a>
        </div>
      </td>
    </tr>
    `
    document.getElementById("articulosDelCarrito").innerHTML = htmlContentToAppend;

    subtotalItems(); //aca esta funcion se ejecuta pero como no hay nada, no pone nada, lo deja en 0
    totalFinal();

  } else {
  
    for(let i = 0; i < itemCarrito.articles.length; i++){
      htmlContentToAppend += `
          <tr class="tr-carrito" id="trCarrito" name="`+ i +`">
            <div class="fila-articulos">
              <td class="td-articulo">
                <div class="iconos-extras">
                  <i class="fas fa-times trash" id="trash"></i>
                  <i class="far fa-heart fav"></i>              
                </div>
                  <div class="imagen-art card" id="imgArt">
                  <img src="` + itemCarrito.articles[i].src + `" class="imagenProducto">
                  </div>
                  <div class="nombre-art">
                    <p id="itemName">
                    `+ itemCarrito.articles[i].name +`
                    </p>
                  </div>
              </td>

              <td>
              <p id="precioUnitario">
              `+ itemCarrito.articles[i].currency + " " + itemCarrito.articles[i].unitCost +`
              </p>
              </td>

                <td>
                  <div class="input-cantidad">
                    <input type="number" name="`+ i +`" id="inputCantidad" value="`+ itemCarrito.articles[i].count +`" class="inputCantidad" min="0">
                  </div>  
                </td>

                <td>
                <p class="subTotal"></p>
                </td>
            </div>          
          </tr>
      
      `
    }

    document.getElementById("articulosDelCarrito").innerHTML = htmlContentToAppend;

    
	/* 	//este for each esta para que todos los inputs tengan un listener que se ejecuta cuando hay un cambio de valor. el "input" es el tipo de
		evento que se ejecuta cuando se cambia de valor de un input  */
    document.querySelectorAll(".inputCantidad").forEach(item =>{
      item.addEventListener("input", function(e){


				/* //aca cree una variable para saber qué elemento va modificar el input el usuario y el e.target trae el nodo del DOM que se está
				modificando por el usuario y lo agrego así: <input type="number" name="`+ i +`" la "i" es el index del elemento */
        let indexElemento = e.target.getAttribute("name");

        //acá a la variable itemCarrito.articles en los corchetes lee paso la variable que indica el index del elemento  
        itemCarrito.articles[indexElemento].count = e.target.value;

        subtotalItems();
        envioSeleccionado();
        totalFinal();
    
      });
    });

    //el item representa el elemento del arreglo
    document.querySelectorAll(".trash").forEach(function(item){
      item.addEventListener("click", function(e){


        //el closest lo que hace es buscar el elemento mas cercano a él mismo(en este caso .trash), en este caso la etiqueta tr 
        //la e es de evento. el e.target indica cuál fue clickeado y envió el evento
        let indexElemento = e.target.closest("tr").getAttribute("name");

        //El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos
        //el indexElemento es el index, es la posicion del elemento que quiero borrar, con el 1 le indico la cantidad que quiero borrar 
        itemCarrito.articles.splice(indexElemento, 1);

        carritoDeCompras();
      });
    });

    subtotalItems();
    envioSeleccionado();
    totalFinal();
  }; //aca cierro el if
};


/* //El método querySelectorAll() de un Element devuelve una NodeList estática (no viva) que representa una lista de elementos
del documento que coinciden con el grupo de selectores indicados */
function subtotalItems(){
  let subTotalesHtml = document.querySelectorAll(".subTotal");
  let subTotalFinal = 0; //eL SUBTOTAL arranca en 0

  for(let i = 0; i < itemCarrito.articles.length; i++){
    let conversion = 1;

    if(itemCarrito.articles[i].currency === "USD"){
      conversion = 40;
    }

    //aca creo una propiedad nueva que se llama subtotal que es igual a unitcost * el count
    itemCarrito.articles[i].subTotal = itemCarrito.articles[i].unitCost *  itemCarrito.articles[i].count * conversion;

    subTotalesHtml[i].innerHTML =  itemCarrito.articles[i].subTotal; //inserto en el html la propiedad nueva "subtotal"

    subTotalFinal += itemCarrito.articles[i].subTotal; //este es el subtotal final, que por cada iteración va sumando el subtotal de cada elemento
  }

  subTotal = subTotalFinal;
  document.getElementById("subtotalNumero").innerHTML = "$ " + subTotalFinal;
  document.getElementById("cifraSubTotal").innerHTML = "$ " + subTotalFinal;
};




function metodoSeleccionado(){

  let textoMostrar = "Has seleccionado el método de pago: ";

  if(metodoPago === "transferencia"){
    textoMostrar += "<b>Transferencia Bancaria</b>";
  } else {
    textoMostrar += "<b>Tarjeta de Crédito</b>";
  }
  
  document.getElementById("metodoSeleccionado").innerHTML = textoMostrar;
  document.querySelector(".modal-container").style.display = "none";
};



function envioSeleccionado(){  

  if(document.querySelector('input[name="envio"]:checked') !== null){

    let envioSeleccionado = document.querySelector('input[name="envio"]:checked').id;

    switch(envioSeleccionado){
      case "premium": 
        totalEnvio = subTotal * 0.15;
        break;
      case "express": 
        totalEnvio = subTotal * 0.07;
        break;
      case "estandar": 
        totalEnvio = subTotal * 0.05;
        break;
    }

  } else {
    totalEnvio = 0;
  }  
 
  document.getElementById("costoEnvio").innerHTML = "$ " + totalEnvio;
};

//La declaración switch evalúa una expresión, comparando el valor de esa expresión con una instancia case, y ejecuta declaraciones asociadas a ese case, así como las declaraciones en los case que siguen.

function totalFinal(){

  let total = subTotal + totalEnvio;

  document.getElementById("cifraTotal").innerHTML = "$ " + total;

}




document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_DOS_URL).then(function (resultObj){
    if (resultObj.status === "ok"){

      itemCarrito = resultObj.data;
      
      carritoDeCompras();
    }
  });

  document.querySelectorAll("inpRadio").forEach(function(item){
    item.addEventListener("input", function(e){


      let indexElemento = e.target.closest("div").getAttribute("name"); 

    });
  });

  //MODAL METODO DE PAGO
  //Mostrar Modal
  document.getElementById("seleccionarBtn").addEventListener("click", function(){
    document.querySelector(".modal-container").style.display = "flex";
  });

  //Cerrar Modal
  document.querySelector(".cerrar-btn").addEventListener("click", function(){
    document.querySelector(".modal-container").style.display = "none";
  });

  document.querySelectorAll('input[name="radio"]').forEach(function(item){
    item.addEventListener("click", function(){
      metodoPago = document.querySelector('input[name="radio"]:checked').id;

      let inputNumeroTarjeta = document.getElementById("numeroTarjeta");
      let inputCodigoSeguidad = document.getElementById("seguridad");
      let inputVencimiento = document.getElementById("mmaa");
      let inputNumeroCuenta = document.getElementById("numeroCuenta");

      if(metodoPago === "transferencia"){
        inputNumeroTarjeta.required = false;
        inputCodigoSeguidad.required = false;
        inputVencimiento.required = false;
        inputNumeroCuenta.required = true;

        inputNumeroTarjeta.disabled = true;
        inputCodigoSeguidad.disabled = true;
        inputVencimiento.disabled = true;
        inputNumeroCuenta.disabled = false;

      } else {
        inputNumeroTarjeta.required = true;
        inputCodigoSeguidad.required = true;
        inputVencimiento.required = true;
        inputNumeroCuenta.required = false;

        inputNumeroTarjeta.disabled = false;
        inputCodigoSeguidad.disabled = false;
        inputVencimiento.disabled = false;
        inputNumeroCuenta.disabled = true;
      }

      document.getElementById("aceptarBtn").disabled = false;
      /*The disabled property sets or returns whether a drop-down list should be disabled, or not.  A disabled element is unusable and un-clickable. Disabled elements are usually rendered in gray by default in browsers.
      true - The drop-down list is disabled
      false - Default. The drop-down list is not disabled*/
    });  
  });


  //Seleccionar envío
  document.querySelectorAll('input[name="envio"]').forEach(function(item){
    item.addEventListener("click", function(){
      
      envioSeleccionado();
      totalFinal();

    });
  });

  //Modal compra realizada
  let form = document.getElementById('datosEnvio');
    form.addEventListener("submit", function(event){
      event.preventDefault();
      event.stopPropagation();

      form.classList.add('was-validated');

      if (form.checkValidity() === true) {
        document.querySelector(".modal-container-exito").style.display = "flex";
      }
  });


  let formMetodoPago = document.getElementById("metodoPagoModal");

    formMetodoPago.addEventListener("submit", function(event){
      event.preventDefault();
      event.stopPropagation();

     

      formMetodoPago.classList.add('was-validated');

      if (formMetodoPago.checkValidity() === true){
        let textoMostrar = "Has seleccionado el método de pago: ";

        if(metodoPago === "transferencia"){
          textoMostrar += "<b>Transferencia Bancaria</b>";
        } else {
          textoMostrar += "<b>Tarjeta de Crédito</b>";
        }
        
        document.getElementById("metodoSeleccionado").innerHTML = textoMostrar;
        document.querySelector(".modal-container").style.display = "none";
      }
});     

  //El método HTMLSelectElement.checkValidity() comprueba si el elemento tiene restricciones y si las cumple. Si el elemento no cumple sus restricciones, el navegador lanza un evento cancelable invalid al momento y luego devuelve false.

    //Cerrar Modal
    document.getElementById("homeBtn").addEventListener("click", function(){
      location.href="index.html"
    });

});