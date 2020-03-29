const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

watch = () => {
    browserSync.init({
        server: {
            baseDir: './',
        },
        notify: false
    });
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./scripts/**/*.js').on('change', browserSync.reload, script);
    gulp.watch('./styles/**/*.css').on('change', browserSync.reload);
}

script = () => {
    return gulp.src(
        [
        'node_modules/babel-polyfill/dist/polyfill.js',
        'script/**/*.js'
        ])
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('compiled'))
}

exports.script = script;
exports.watch = watch;