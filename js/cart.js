//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var itemCarrito = {};



function carritoDeCompras(itemCarrito){
  let htmlContentToAppend = "";
  

  for(let i = 0; i < 2; i++){
    htmlContentToAppend += `
        <tr class="tr-carrito">
          <div class="fila-articulos">
            <td class="td-articulo">
              <div class="iconos-extras">
                <i class="fas fa-times  trash"></i></i></i><i class="far fa-heart fav"></i>              
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
                  <input type="number" name="" id="inputCantidad" value="1">
                </div>  
              </td>

              <td>
              <p id="subTotal"></p>
              </td>
          </div>          
        </tr>
    
    `
  }

  document.getElementById("articulosDelCarrito").innerHTML = htmlContentToAppend;
};


// 1- hacer un event listener o una funcion que se active cuando modificas la cantidad de prod. en el input
// 2- recojer el valor del nuevo cantidad y  guardarlo en una variable
// 3- insertar en el subtotal la multipiclacion de las dos variables

 

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_DOS_URL).then(function (resultObj){
    if (resultObj.status === "ok"){

      itemCarrito = resultObj.data;
      
      carritoDeCompras(itemCarrito);

    }


  });

});

