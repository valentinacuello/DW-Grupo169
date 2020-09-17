var product = {};   // esto se inicializa como un ojbeto vacío
var reviewProducts = [];   // esto se inicializa como un array vacio (que en este caso adentro tiene muchos objetos)

var newReviews = [];



function showImagesGallery(array) {
    //Declaro aquí la primer variable//
    let htmlContentToAppend = `
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
            `;

    //Declaro aquí dos variables, una para insertar las imagenes, la otra es para agregar las barritas del carrusel//
    let productImgs = "";
    let carouselIndicators = "";

    //un for que sirve para iterar e ir agregando las imagenes y barritas //

    for (let i = 0; i < array.length; i++) {
        //Declaro dos variables: una es el array de las imagenes del json, la otra es la imagen con la prop Active que es requerida por el carrusel de boostrap//
        let imageSrc = array[i];
        let imgActive = "";

        //este if lo que hace es que a la primera imagen le agrega el string " active" que es requerido por el carousel //
        if(i==0){
            imgActive = " active"
        }

        //acá agrego código HTML a la variable productImgs que a su vez concatena las variables para agregar la imagen activa y el resto de la galeria //
        productImgs += `
                <div class="carousel-item`+ imgActive +` ">
                    <img src="` + imageSrc + `" class="d-block w-100" alt="...">
                </div>
        `
        //acá agrego código HTML a la variable carousel Indicators y a su vez concateno con el iterador i y también concateno la variable imgActive //
        carouselIndicators +=  `<li data-target="#carouselExampleIndicators" data-slide-to="`+ i +`" class="`+ imgActive +`"></li>`
    
    }


    htmlContentToAppend += carouselIndicators + `                
            </ol>
        <div class="carousel-inner">` + productImgs +
        `
        </div>

            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        `
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}



function cantidadOpiniones(array){
    let htmlContentToAppend = "";
    let cantidadOpiniones = array.length;
    let cantidadEstrellas = 0;

    for(let i = 0; i < array.length; i++){
        cantidadEstrellas += array[i].score;        
    }

    let promedioEstrellas = Math.round(cantidadEstrellas / cantidadOpiniones)
    let score = "";

        for(let i = 1; i <= promedioEstrellas; i++){
            score += `<span class="fa fa-star checked"></span>`
        }

        for(let i = promedioEstrellas + 1; i <= 5; i++){
            score += `<span class="fa fa-star not-checked"></span>`
        }



    htmlContentToAppend += score +`<a href="#opiniones" id="cantidadOpiniones">`+ cantidadOpiniones +` opiniones</a> `
    document.getElementById("insertarCantidadOpiniones").innerHTML = htmlContentToAppend;

}

//Modal formulario para agregar nueva opinion
document.getElementById("agregarNuevaOpinion").addEventListener("click", function(){
    document.querySelector(".fondo-modal").style.display = "flex";
});

document.querySelector(".cancelar-boton").addEventListener("click", function(){
    document.querySelector(".fondo-modal").style.display = "none";
});



function nuevaOpinion(){
    var today = new Date();
    var obtenerFecha = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ';
    var hour = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

    var fechaYHora = obtenerFecha + hour;



    var userName = localStorage.getItem('nombre');
    var scoreStar = document.getElementById("starRating").value;
    var dateAndTime = fechaYHora;
    var descriptionRevew =  document.getElementById("areaTexto").value;
}





//User en el modal
document.getElementById("nombreUsuarioModal").innerHTML = localStorage.getItem('nombre');



function showReviews(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let review = array[i]; 
        let score = "";

        for(let i = 1; i <= review.score; i++){
            score += `<span class="fa fa-star checked"></span>`
        }

        for(let i = review.score + 1; i <= 5; i++){
            score += `<span class="fa fa-star not-checked"></span>`
        }

        htmlContentToAppend += `
        <div class="review-content">
          <h5 id="userName">`+ review.user +`</h5>
          <p id="reviewData">`+ review.dateTime +`</p>
          <div class="rating">`+ score +`</div>
          <hr class="separador">
          <p id="reviewDescription">`+ review.description +`</p>
        </div> 
        `
        document.getElementById("reviewItems").innerHTML = htmlContentToAppend;
    }

   


}





document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productImagesHTML = document.getElementById("productImagesGallery");
            let productCostHTML = document.getElementById("productCost");



            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount + " unidades vendidas";
            productImagesHTML.innerHTML = product.images;
            productCostHTML.innerHTML = product.currency + " " + product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok"){
            reviews = resultObj.data;


            showReviews(reviews);
            cantidadOpiniones(reviews);

        }
    });

});

