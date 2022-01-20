//Hago la funcionalidad para buscar libros por titulo.

// $(document).ready(function(){
    
//     $("#formulario").submit(function(){

//         var buscar = $("#buscar").val();
        
//         if(buscar == ''){
            
//             alert("Ingrese informacion del libro");
        
//         }else if( buscar != ''){
            
//             $(".libro").remove();
            
//             // alert(buscar);
//             var url = '';
//             var img = '';
//             var titulo = '';
//             var autor = '';

//             $.get("https://www.googleapis.com/books/v1/volumes?q=" + buscar + "&maxResults=10",function(response){

//                 // console.log(response);
//                 for ( i=0; i<response.items.length; i++){
                   
//                     titulo = '<div class="libro"><p class="tit_libro">'+ response.items[i].volumeInfo.title + '</p>';
//                     autor = '<p>'+ response.items[i].volumeInfo.authors + '</p>';
//                     url = response.items[i].volumeInfo.imageLinks.thumbnail;
//                     img = '<img src="' + url + '" "href=' + response.items[i].volumeInfo.infoLink + '>';
//                     boton_mas = '<br><a href=' + response.items[i].volumeInfo.infoLink + ' target="_blank"><button class="button">Leer Mas</button></a>';
//                     boton_compartir = '<a href="compartir.html" target="_blank"><button class="button boton-compartir">Compartir con un amigo</button></a></div>';
                    
//                     // img.attr('src',url);

//                     var div =[];
//                     div.push(
//                         titulo,
//                         autor,
//                         img,
//                         boton_mas,
//                         boton_compartir
//                     );

//                     $("#resultados").append(div.join(""));

//                     // title.appendTo("#resultados");
//                     // autor.appendTo("#resultados");
//                     // img.appendTo("#resultados");
//                     // boton_mas.appendTo("#resultados");
//                     // boton_compartir.appendTo("#resultados");
                    
//                 }
//             });
//         };

//         return false;

//     });

// })

//Dejo la funcionalidad anterior comentada por las dudas.


// Vuelvo a hacer la funcionalidad de buscar libros pero le agrego para buscar por autor y editorial

$(document).ready(function(){
    
    $("#formulario").submit(function(){

        var tit = $("#titulo").val();
        var aut = $("#autor").val();
        var edi = $("#editorial").val();
        
        if( tit != ''){
            
            $(".libro").remove();
            
            var url = '';
            var img = '';
            var titulo = '';
            var autor = '';
            var editorial ='';
            var query = "https://www.googleapis.com/books/v1/volumes?q=" + tit;
            
            if( aut != ''){
                query = query + "+inauthor:" + aut
            }
            
            if ( edi != ''){
                query = query + "+inpublisher:" + edi
            }

            $.get(query + "&maxResults=10" ,function(response){

                if (localStorage.getItem("historial") != null){
                    var historialTmp = localStorage.getItem("historial");
                    historialTmp = historialTmp + "<p>"+tit+"</p>";
                    localStorage.setItem("historial", historialTmp);
                }else{
                    var historialTmp = "<p>"+tit+"</p>";
                    localStorage.setItem("historial", historialTmp);
                }
                //console.log(localStorage.getItem("historial"));
                //console.log(response);

                for ( i=0; i<response.items.length; i++){
                   
                    titulo = '<div id="'+i+'"class="libro"><p id="tit_libro" class="tit_libro">'+ response.items[i].volumeInfo.title + '</p>';
                    autor = '<p id="aut_libro" class="aut_libro">'+ response.items[i].volumeInfo.authors + '</p>';
                    editorial = '<p class="edi_libro">'+ response.items[i].volumeInfo.publisher + '</p>';
                    url = response.items[i].volumeInfo.imageLinks.thumbnail;
                    img = '<img src="' + url + '" "href=' + response.items[i].volumeInfo.infoLink + '>';
                    boton_mas = '<br><a href=' + response.items[i].volumeInfo.infoLink + ' target="_blank"><button class="button">Leer Mas</button></a>';
                    // boton_compartir = '<a href="compartir.html"><button class="button boton-compartir">Compartir con un amigo</button></a></div>';
                    boton_compartir = '<button class="button boton-compartir" onclick="email(this)">Compartir con un amigo</button></div>';

                    var div =[];
                    div.push(
                        titulo,
                        autor,
                        editorial,
                        img,
                        boton_mas,
                        boton_compartir
                    );

                    $("#resultados").append(div.join(""));
                    
                }
            });

            $("#mas-resultados").show();

        };

        return false;

    });  

})

//Hago la funcion que me permite agregar mas resultados de la busqueda

var indice = 0;

function masResultados(){

    var tit = $("#titulo").val();
    var aut = $("#autor").val();
    var edi = $("#editorial").val();
    
    if(tit == ''){
        
        alert("Ingrese informacion del libro");
    
    }else if( tit != ''){
        
        var url = '';
        var img = '';
        var titulo = '';
        var autor = '';
        var query = "https://www.googleapis.com/books/v1/volumes?q=" + tit;
        
        if( aut != ''){
            query = query + "+inauthor:" + aut
        }
        
        if ( edi != ''){
            query = query + "+inpublisher:" + edi
        }

        indice = indice + 10;

        $.get(query + "&maxResults=10&startIndex=" + indice ,function(response){

            for ( i=0; i<response.items.length; i++){

                var id = +i + +indice;
               
                titulo = '<div id="'+id+'"class="libro"><p class="tit_libro">'+ response.items[i].volumeInfo.title + '</p>';
                autor = '<p class="aut_libro">'+ response.items[i].volumeInfo.authors + '</p>';
                editorial = '<p class="edi_libro">'+ response.items[i].volumeInfo.publisher + '</p>';
                url = response.items[i].volumeInfo.imageLinks.thumbnail;
                img = '<img src="' + url + '" "href=' + response.items[i].volumeInfo.infoLink + '>';
                boton_mas = '<br><a href=' + response.items[i].volumeInfo.infoLink + ' target="_blank"><button class="button">Leer Mas</button></a>';
                // boton_compartir = '<a href="compartir.html"><button class="button boton-compartir" onclick="email()">Compartir con un amigo</button></a></div>';
                boton_compartir = '<button class="button boton-compartir" onclick="email(this)">Compartir con un amigo</button></div>';

                var div =[];
                div.push(
                    titulo,
                    autor,
                    editorial,
                    img,
                    boton_mas,
                    boton_compartir
                );

                $("#resultados").append(div.join(""));
                
            }
        });
    };

    return false;

}

//Funcion que me devuelve el mapa centrado y con un marker rojo en la catedral de la plata 

function ubicacion(){

    var boton = document.getElementById("boton_ubicacion");

    boton.style.display = "none";
    
    var output = document.getElementById("mapa");

	var lat = -34.9227855;
	var long= -57.9557566;

	var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+long+"&size=600x300&markers=color:red%7C"+lat+","+long+"&key=AIzaSyBI5IFzefQLm2UbhrdqHEjpT9naPi8C2Hs";

	output.innerHTML = "<img src='"+imgURL+"'>";

}

//Funcion con la que guardo el titulo y autor del libro en el localStorage para rellenar los campos del formulario del email y redirecciono a dicho formulario.

function email(libro){

    // var lib = $(libro).parents("div")[0].id;

    // console.log(lib[0].id);

    tit = $(libro).parent("div").find("#tit_libro")[0].innerHTML;
    aut = $(libro).parent("div").find("#aut_libro")[0].innerHTML;

    localStorage.setItem( "titulo", tit);
    localStorage.setItem( "autor", aut);

    window.location.href = "compartir.html";

}

//Funcion que redirecciona al historial de busquedas.

function historial(){
    window.open("historial.html", '_blank');
}