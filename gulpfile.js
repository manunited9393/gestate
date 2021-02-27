const {src, dest, parallel, series, watch} = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'src/' },
        notify: false,
        online: true
    });
}


function scripts() {
	return src([ // Берём файлы из источников
		// 'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
		'src/js/script.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
		])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream());
}

function styles() {
    return src('src/sass/style.scss')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(cleancss(( { level: { 1: { specialComments: 0} } })))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}

function images() {
    return src('src/images/src/**/*')
        .pipe(newer('src/images/dist'))
        .pipe(imagemin())
        .pipe(dest('src/images/dist'));
}

function cleanimg() {
    return del('src/images/dist/**/*', { force: true });
}

function cleandist() {
    return del('dist/**/*', { force: true });
}

function buildcopy() {
    return src([
        'src/css/**/*.min.css',
        'src/js/**/*.min.js',
        'src/images/dist/**/*',
        'src/**/*html',
    ], { base: 'src' })
    .pipe(dest('dist'));
}

function startwatch() {
    watch(['src/**/*js', '!**/*.min.js'], scripts);
    watch('src/sass/**/*.scss', styles);
    watch('src/**/*.html').on('change', browserSync.reload);
    watch('src/images/src/**/*', images);
}


exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;
exports.build = series(cleandist, styles, scripts, images, buildcopy);
exports.default = parallel(scripts, styles, images, browsersync, startwatch);