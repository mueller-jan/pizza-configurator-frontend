var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');


gulp.task('clean', function () {
    gulp.src('dist/*')
        .pipe(clean({force: true}));
});


gulp.task('index', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './common/**/*.js']);
    var options = {ignorePath: 'src', relative: true};
    return target
        .pipe(inject(sources.pipe(angularFilesort()), options))
        .pipe(gulp.dest('./src'));
});

gulp.task('minify-css', function () {
    return gulp.src('src/css/styles.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function () {
    return gulp.src('src/**/*.js')
        .pipe(angularFilesort())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-vendor', function () {
    gulp.src('./vendor/**/*.js')
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('copy-assets', function () {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy-html-files', function () {
    gulp.src('./src/**/*.html')
        .pipe(replace('../vendor', './vendor'))
        .pipe(gulp.dest('dist/'))

});

gulp.task('build', function () {
    runSequence(
        'clean',
        'minify-css',
        'minify-js',
        'copy-assets',
        'copy-html-files',
        'copy-vendor'
    );
});

gulp.task('default', function () {
});