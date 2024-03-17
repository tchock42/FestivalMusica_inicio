document.addEventListener('DOMContentLoaded', function(){ //cuando el html ha sido analizado y los scritps descargados. No espera imagenes, subframes ni scripts asicronos
    iniciarApp();
});
function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
    addYear();
}

function navegacionFija(){
    const barra = document.querySelector('.header'); //se selecciona el header que se va a mover
    const sobreFestival = document.querySelector('.sobre-festival'); //clase sobre la cual aparecerá el header flotando
    const body = document.querySelector('body'); //seleeciona el body para evitar que el body  se mueva al aparecer el header

    window.addEventListener('scroll', function(){ //callback que detecta el scroll en la ventana y llama a otra funcion
        //console.log( sobreFestival.getBoundingClientRect() ); //posicion del elemento sobre-festival respecto al bordesuperior del documento
        if ( sobreFestival.getBoundingClientRect().bottom < 0 ){
            //console.log('Ya pasamos el elemento');
            barra.classList.add('fijo'); //agrega la clase .fijo al header al pasar a la siguiente seccion
            body.classList.add('body-scroll'); //para que no se desplace el body
        }else{
            // console.log('Aun no...');
            barra.classList.remove('fijo');  //borra la clase fijo
            body.classList.remove('body-scroll'); //quita la clase que evita se desplace el body
        }
        
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //crea variable enlaces, que son todos los a
    enlaces.forEach(enlace => { // se requiere iterar ya que se tienen 3 elementos a
        enlace.addEventListener('click', function(evento){ //se selecciona cualquier "evento". Enlace es un solo enlace
            evento.preventDefault(); //sin este preventDefault, se iría directamente al elemento seleccionado
            
            //console.log(evento.target.attributes.href.value); //imprime el href al que se le da clic, value es su valor
            const seccionScroll = evento.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"}); //Metodo para desplazamiento con objetos de configuracion
        })
    })
}
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let  i = 1; i < 13; i++){
        
        const imagen = document.createElement('picture'); //crea etiquetas picture
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading ="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" 
            alt="imagen galeria">
        `;
        imagen.onclick =function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}
function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading ="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" 
        alt="imagen galeria">
    `;
    //crea el overlay con la imagen
    const overlay = document.createElement('DIV'); //crea un elemento div con overlay ariana rabanal
    overlay.appendChild(imagen); //inserta el elemento imagen de la etiqueta DIV
    overlay.classList.add('overlay');  //crea una clase overlay para el elemento div overlay
    //hasta este punto aun no aparece nada en pantalla al dar clic
    
    overlay.onclick = function(){   //funcion para quitar la imagen al dar clic  en cualquier punto
        const body = document.querySelector('body'); //selecciona body. Overlay ya está agregado
        body.classList.remove('fijar-body'); //quita la clase que hace que no se mueva el body
        overlay.remove(); //quita la imagen
    }

    //Boton para cerrar la ventana modal
    const cerrarModal = document.createElement('P'); //crea el elemento cerrarModal con etiqueta p
    cerrarModal.textContent = 'X' //asigna texto a p
    cerrarModal.classList.add('btn-cerrar'); //asigna clase a p

    cerrarModal.onclick = function(){ //funcion para quitar imagen al dar clic a la x
        const body = document.querySelector('body'); //selecciona body. Overlay ya está agregado
        body.classList.remove('fijar-body'); //quita la clase que hace que no se mueva el body
        overlay.remove(); //quita la imagen
    }

    overlay.appendChild(cerrarModal); //agrega cerrarModal a overlay, el cual abajo se agregó al body

    //añadir al html
    const body = document.querySelector('body');  //selecciona la etiqueta de body
    body.appendChild(overlay); //inserta la imagen al final del documento
    body.classList.add('fijar-body'); //agrega fijarbody cuando se da clic a una imgaen
}

function addYear(){
    const item = document.querySelector('.item');
    year = new Date().getFullYear();

    item.textContent = year;
}