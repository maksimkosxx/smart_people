var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    // svgmin       = require('gulp-svgmin'),  // Минификация svg изображений
    gcmq         = require('gulp-group-css-media-queries'),
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок   
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src([
        'app/sass/main.scss'
    ])
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 10 versions', '> 2%', 'ie 8', 'ie 9'], { cascade: true })) // Создаем префиксы
        .pipe(gcmq())
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css/')) // Выгружаем в папку app/css
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/libs/js/jquery-3.2.1.min.js',
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/libs
});


// gulp.task('svgmin', function () {  // Минификация свг изображений
//     return gulp.src('app/img/**/*.svg')
//         .pipe(svgmin())
//         .pipe(gulp.dest('app/img'));
// });

gulp.task('watch', ['browser-sync', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});


gulp.task('build', ['clean', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим css в продакшен
        'app/css/main.min.css'
    ])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));


    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

    var buildImg = gulp.src('app/img/**/*') // Переносим изображения в продакшен
        .pipe(gulp.dest('dist/img/'));

    var buildPhp = gulp.src('app/*.php') // Переносим изображения в продакшен
        .pipe(gulp.dest('dist/'));


    var buildFavicon = gulp.src([ // Переносим css в продакшен
        'app/*.ico',
        'app/*.png'
    ])
        .pipe(gulp.dest('dist/'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
