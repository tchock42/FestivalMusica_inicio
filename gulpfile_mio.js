const { src, dest, watch, parallel} = require('gulp'); //solicita la funcionalidad de gulp en node_modules //    src es para identificar un archivo, dest es para guardarlo
//CSS
const sass = require('gulp-sass')(require('sass')); // importa el script de sass del gulp file
const plumber = require('gulp-plumber'); //extrae la funcion plumber de la dependencia gulp-plumber
//Imagenes
const cache = require('gulp-cache'); //extrae la funcion cache de la dependencia gulp-cache
const webp = require('gulp-webp'); //extrae la funcion webp de la dependecia que se encarga de convertir
const imagemin = require('gulp-imagemin'); //extrae la funcion imagemin de gulp-imagemin
const avif = require('gulp-avif');
function css(done){
    //almacenarla en el disco duro.Guarda
    src('src/scss/**/*.scss')//identificar el archivo de sass. Identifica **-> todas las carpetas | *-> todos los archivos que tengan esa extension
        .pipe(plumber())
        .pipe(sass()) //Compilar.Procesa
        .pipe(dest('build/css')); //almacenarla en el disco duro.Guarda//lo anterior identifica la fuente del archivo y ejecuta pipe en //cascada, mandando a llamar sass y lo compila y finalmente selecciona //el destino
    done(); //callaback que avisa a gulp cuando llegamos al final
}
function imagenes(done){
    const opciones = {
        optimizationLevel: 3 //aligera las imagenes a un nivel de optimizacion 3
    }
    src('src/img/**/*.{png,jpg}') //la misma que versionWebp
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest ('build/img'))
    done();
}
function versionWebp(done){
    const opciones={
        quality: 50 //calidad de 50/100
    };
    src('src/img/**/*.{png,jpg}') //**todos las carpetas * todos los archivos, dos formatos
        .pipe( webp(opciones) ) //conversion usando las opciones
        .pipe(dest('build/img'))
    done();
}
function versionAvif(done){
    const opciones={
        quality: 50 //calidad de 50/100
    };
    src('src/img/**/*.{png,jpg}') //**todos las carpetas * todos los archivos, dos formatos
        .pipe( avif(opciones) ) //conversion usando las opciones
        .pipe( dest('build/img'))
    done();
}
function javascript(done){
    src('src/js/**/*.js') //escuchar en todas las carpetas, todos los archivos con extension js
        .pipe( dest( 'build/js' ) );
    done();
}   
function dev (done){
    watch('src/scss/**/.scss', css) //revisa el archivo .scss por cambios
    watch('src/js/**/*.js', javascript); //revisa  el archivo js por cambios
    done();
}
exports.css = css;
exports.js = javascript; //permite ejecutar los archivos javascript separadamente
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;  //exports.dev = dev; //llama a la funcion de de //ejecuta de forma paralela dev y versionWebp
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev, css);    //ahora al ejecutar dev en la terminal se ejecuta versionWeb y dev