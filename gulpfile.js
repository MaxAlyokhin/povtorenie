'use strict';

const { src, dest, watch, series, parallel } = require('gulp'),
                            sass             = require('gulp-sass'), // Sass компиллятор
                            sourcemaps       = require('gulp-sourcemaps'), // Sourcemaps
                            autoprefixer     = require('gulp-autoprefixer'), // Автопрефиксер CSS
                            uglify           = require('gulp-uglify'), // Минификация js
                            imagemin         = require('gulp-imagemin'), // Компрессия изображений
                            imageminPngquant = require('imagemin-pngquant'), // Дополнение для .png
                            rigger           = require('gulp-rigger'), //Подключение шаблонов
                            rimraf           = require('rimraf'), // Удаление файлов
                            concat           = require('gulp-concat'), // Конкатенация
                            browserSync      = require('browser-sync'), // Сервер
                            reload           = browserSync.reload;

//Здесь хранятся пути до всех файлов
const path = {
    //Брать исходники здесь:
    src: { 
      html:  'src/*.html',
      sass:  'src/styles/*.*',
      js:    'src/scripts/*.js', 
      img:   'src/content/**/*.jpg',
      fonts: 'src/fonts/**/*.*'
    },
    //За изменением каких файлов мы хотим наблюдать:
    watch: { 
      html:  'src/*.html',
      sass:  'src/styles/*.*',
      js:    'src/scripts/*.js', 
      img:   'src/content/**/*.jpg',
      fonts: 'src/fonts/**/*.*'
    },
    //Готовые после сборки файлы переносим сюда:
    dist: { 
      html:  'dist/',
      css:   'dist/css/',
      js:    'dist/js/',
      img:   'dist/content/',
      fonts: 'dist/fonts/'
    },
    clean: 'dist'
};

//Здесь настройки сервера
const config = {
    server: {
        baseDir: "dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "DevServer",
    open: false //Браузер автоматом не открываем
};

//Сборка html
function html() {
    return src(path.src.html) //Путь до исходных файлов в src
        .pipe(rigger()) //Rigger позволяет использовать шаблоны и подключать их в документы
        .pipe(dest(path.dist.html)) //Вывод готового в dist
        .pipe(reload({stream: true})); //Обновляем сервер
}

//Сборка css
function style() {
    return src([path.src.sass]) //Путь до исходных файлов в src
        // .pipe(sourcemaps.init()) //Инициализируем sourcemaps
        .pipe(sass({ //Параметры gulp-sass
            sourceMap: false, //sourcemaps выключены
            errLogToConsole: true, //Пишем логи
            outputStyle: 'compressed' //Минифицируем
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 10 versions']})) //Добавляем вендорные префиксы, настраивается также через package.json в browserlist
        // .pipe(sourcemaps.write()) //Прописываем sourcemaps
        .pipe(dest(path.dist.css)) //Вывод готового в dist
        .pipe(reload({stream: true})); //Обновляем сервер
}

//Сборка js
function js() {
    return src([path.src.js]) //Путь до исходных файлов в src
        // .pipe(rigger()) //Rigger позволяет использовать шаблоны и подключать их в документы
        // .pipe(sourcemaps.init()) //Инициализируем sourcemaps
        .pipe(concat('main.min.js'))
        .pipe(uglify()) //Минифицируем js
        // .pipe(sourcemaps.write()) //Пишем sourcemaps
        .pipe(dest(path.dist.js)) //Вывод готового в dist
        .pipe(reload({stream: true})); //Обновляем сервер
}

//Оптимизация изображений
function image() {
    return src(path.src.img) //Путь до исходных файлов в src
        .pipe(imagemin({plugins: [imageminPngquant()]})) //Оптимизация изображений + плагин для png
        .pipe(dest(path.dist.img)) //Вывод готового в dist
        .pipe(reload({stream: true})); //Обновляем сервер
}

//Шрифты (перенос из src в dist)
function fonts() {
    return src(path.src.fonts) //Вход
        .pipe(dest(path.dist.fonts)) //Выход
        .pipe(reload({stream: true})); //Обновляем сервер
}

//Очистка
function clean(cb) {
    rimraf(path.clean, cb);
}

//Команды:

//Удалить dist
exports.clean = clean;

//Собрать Sass
exports.sass = style;

//Собрать js
exports.js = js;

//Собрать проект
exports.build = series(clean, html, style, js, image, fonts);

//Запуск сервера
exports.dev = function() {
    browserSync(config)
    watch(path.src.html, html)
    watch(path.src.sass, style)
    watch(path.src.js, js)
    watch(path.src.img, image)
    watch(path.src.fonts, fonts)
}

//По дефолту всё собираем и запускаем сервер
exports.default = parallel(html, style, js, image, fonts, function() {
    browserSync(config)
    watch(path.src.html, html)
    watch(path.src.sass, style)
    watch(path.src.js, js)
    watch(path.src.img, image)
    watch(path.src.fonts, fonts)
})