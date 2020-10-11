//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var itemCarrito = {};



function carritoDeCompras(itemCarrito){
  let htmlContentToAppend = "";
  

  for(let i = 0; i < itemCarrito.articles.length; i++){
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

  //este for each esta para que todos los inputs tengan un listener que se ejecuta cuando hay un cambio de calor. el "input" es el tipo de evento que se ejecuta cuando se cambia de valor de un input 
  document.querySelectorAll(".inputCantidad").forEach(item =>{
    item.addEventListener("input", function(e){


      //aca cree una variable para saber qué elemento va modificar el input el usuario y el e.target trae el nodo del DOM que se está modificando por el usuario y lo agrego así: <input type="number" name="`+ i +`" la "i" es el index del elemento

      let indexElemento = e.target.getAttribute("name");

      //acá a la variable itemCarrito.articles en los corchetes lee paso la variable que indica el index del elemento  
      itemCarrito.articles[indexElemento].count = e.target.value;

      subtotalItems();
  
    });
  });

  subtotalItems();

};


function subtotalItems(){
  let subTotalesHtml = document.querySelectorAll(".subTotal");
  let subTotalFinal = 0;

  for(let i = 0; i < itemCarrito.articles.length; i++){
    let conversion = 1;

    if(itemCarrito.articles[i].currency === "USD"){
      conversion = 40;
    }

    //aca creo una propiedad nueva que se llama subtotal que es igual a unitcost * el count
    itemCarrito.articles[i].subTotal = itemCarrito.articles[i].unitCost *  itemCarrito.articles[i].count * conversion;

    subTotalesHtml[i].innerHTML =  itemCarrito.articles[i].subTotal;
    subTotalFinal += itemCarrito.articles[i].subTotal;
  }

  document.getElementById("subtotalNumero").innerHTML = "$ " + subTotalFinal;
};




document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_DOS_URL).then(function (resultObj){
    if (resultObj.status === "ok"){

      itemCarrito = resultObj.data;
      
      carritoDeCompras(itemCarrito);

    }


  });



});

