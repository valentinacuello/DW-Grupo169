//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var articleCart = [];
var artItem = {};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj){
      if (resultObj.status === "ok"){
        artItem = resultObj.data;

          let articleImgHTML = document.getElementById("imgArt");
          let articleNameHTML = document.getElementById("articleName");
          let articleCostHTML = document.getElementById("articleCost");


          articleImgHTML.innerHTML = artItem.articles[0].src;
          articleNameHTML.innerHTML = artItem.articles[0].name;
          articleCostHTML.innerHTML = artItem.articles[0].currency + " " + artItem.articles[0].unitCost; 

      }     
    });   

});