var product = {};

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

        //un if, donde la variable de la imagen es igualada a " active" antes mencionado //

        if(i==0){
            imgActive = " active"
        }
        //acá agrego código HTML a la variable productImgs que a su vez concatena las variables para agregar la imagen activa y el resto de la galeria //
        productImgs += `
                <div class="carousel-item`+ imgActive +` ">
                    <img src="` + imageSrc + `" class="d-block w-100" alt="...">
                </div>
        `
        //acá agrego código HTML a la variable carousel Indicators  //
        carouselIndicators +=  `<li data-target="#carouselExampleIndicators" data-slide-to="`+ i +`" class="`+ imgActive +`"></li>`
    
    }
    htmlContentToAppend += carouselIndicators + `                
            </ol>
        <div class="carousel-inner">` + productImgs;
    
    htmlContentToAppend += 
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

});
