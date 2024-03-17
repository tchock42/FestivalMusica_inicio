const { src, dest, watch, parallel } = require('gulp'); //identificar, guardar, observar, 

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
//const autoprefixer = require('autoprefixer');
const autoprefixer = require('autoprefixer'); //se asegura que el codigo css funcione en los navegadores
const cssnano = require('cssnano'); //comprime el codigo css
const postcss = require('gulp-postcss'); //transformaciones
//const cssnano = require('cssnano');
//const postcss = require('gulp-postcss');
//const sourcemaps = require('gulp-sourcemaps');
const sourcemaps = require('gulp-sourcemaps'); //identificar el codigo fuente

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
//const terser = require('gulp-terser-js');
const terser = require('gulp-terser-js'); //importa la funcion tercer

function css( done ) {
    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        //.pipe(sourcemaps.init())
        .pipe( sourcemaps.init() )
        .pipe( plumber())
        .pipe( sass() ) // Compilarlo
        .pipe( postcss([autoprefixer(), cssnano() ]))
        //.pipe( postcss([ autoprefixer(), cssnano() ]) )
        //.pipe(sourcemaps.write('.'))
        .pipe(sourcemaps.write('.')) //misma ubicacion de hojas de etilos css
        .pipe( dest('build/css') ) // Almacenarla en el disco duro
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init()) //inicializa sourcemaps para el javascript
        //.pipe( terser() )
        //
        .pipe(terser())
        .pipe(sourcemaps.write('.')) //guarda el sourcemaps en la misma ubicacion en build
        .pipe(dest('build/js'));

    done();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

// function tarea (done) {
//     console.log('Desde la primera tarea');
//     done();
// }
 
// exports.tarea = tarea;

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev) ;