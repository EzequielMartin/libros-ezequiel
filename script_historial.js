//Cuando se carga el documento muestra el historial en un div

$(document).ready(function(){
    var historial = localStorage.getItem("historial");
    var divHistorial = document.getElementById("historial");
    divHistorial.innerHTML = historial;
});

//Funcion que permite borrar el historial de busquedas y recarga la pagina para que se muestren los cambios

function borrarHistorial(){
    
    localStorage.removeItem("historial");
    location.reload();
    
}