//Cuando se carga el documento relleno los campos de titulo y autor con los guardados en el localStorage.

$(document).ready(function(){

    var tit = localStorage.getItem("titulo");
    var aut = localStorage.getItem("autor");

    document.getElementById("form_titulo").value = tit;
    document.getElementById("form_autor").value = aut;

    localStorage.removeItem("titulo");
    localStorage.removeItem("autor");

})

