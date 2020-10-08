//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var itemCarrito = {};


function carritoDeCompras(itemCarrito){
  let htmlContentToAppend = "";
  

  for(let i = 0; i < 2; i++){
    htmlContentToAppend += `
        <tr>
          <td class="td-articulo">
            <div class="imagen-art card" id="imgArt">
            <img src="` + itemCarrito.articles[i].src + `" class="imagenProducto">
            </div>
            <div class="nombre-art">
              <p>
              `+ itemCarrito.articles[i].name +`
              </p>
            </div>
          </td>

          <td>
          <p id="precio">
              `+ "$ "+ itemCarrito.articles[i].unitCost + " " + itemCarrito.articles[i].currency +`
              </p>
          </td>

          <td>
            <div class="input-cantidad">
              <input type="number" name="" id="" value="1">
            </div>
          </td>
        </tr>
    
    `
  }

  document.getElementById("articulosDelCarrito").innerHTML = htmlContentToAppend;
};


document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_DOS_URL).then(function (resultObj){
    if (resultObj.status === "ok"){

      itemCarrito = resultObj.data;
      
      carritoDeCompras(itemCarrito);

    }


  });

});

