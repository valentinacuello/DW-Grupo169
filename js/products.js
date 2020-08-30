
function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];

        if (((minCost  == undefined) || (minCost  != undefined && parseInt(category.cost) >= minCost )) &&
            ((maxCost  == undefined) || (maxCost  != undefined && parseInt(category.cost) <= maxCost )) &&
            ((textoBusqueda == undefined) || (category.name.toLowerCase().includes(textoBusqueda.toLowerCase())) || (category.description.toLowerCase().includes(textoBusqueda.toLowerCase())))
            )
            {

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">`+ category.soldCount + ` artículos</small>
                        </div>
                        <div>
                            <p>`+ category.description + `</p> 
                        </div>
                        <div>
                            <p>`+ "USD " + category.cost + `</p> 
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}



const ORDER_ASC_BY_COST = "- Precio";
const ORDER_DESC_BY_COST = "+ Precio";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost  = undefined;
var textoBusqueda = undefined;

function ordenDePrecios(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function ordenarYMostrarPrecios(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = ordenDePrecios(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            ordenarYMostrarPrecios(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenarYMostrarPrecios(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarYMostrarPrecios(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarYMostrarPrecios(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost  = undefined;
        maxCost  = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost  = document.getElementById("rangeFilterCountMin").value;
        maxCost  = document.getElementById("rangeFilterCountMax").value;

        if ((minCost  != undefined) && (minCost  != "") && (parseInt(minCost )) >= 0){
            minCost  = parseInt(minCost );
        }
        else{
            minCost  = undefined;
        }

        if ((maxCost  != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost  = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showCategoriesList();
    });

    document.getElementById("buscador").addEventListener("keyup", function(){
       textoBusqueda = document.getElementById("buscador").value;
       
       
       showCategoriesList();
    });
});