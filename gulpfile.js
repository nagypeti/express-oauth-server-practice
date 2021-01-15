const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-cleancss'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify-es').default;

const folders = {
    src: 'frontend/',
    dest: 'public/',
};

function static() {
    return gulp.src([folders.src + 'static/**/*']).pipe(gulp.dest(folders.dest + '/static/'));
}

function fonts() {
    return gulp.src([folders.src + '/fonts/**/*']).pipe(gulp.dest(folders.dest + '/fonts/'));
}

function css() {
    return gulp
        .src([folders.src + 'css/*.css'])
        .pipe(concat('libs.min.css'))
        .pipe(sourcemaps.init())
        .pipe(
            autoprefixer({
                overrideBrowserslist: [
                    '> 1%',
                    'ie >= 8',
                    'edge >= 15',
                    'ie_mob >= 10',
                    'ff >= 45',
                    'chrome >= 45',
                    'safari >= 7',
                    'opera >= 23',
                    'ios >= 7',
                    'android >= 4',
                    'bb >= 10',
                ],
            })
        )
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(folders.dest + '/css/'));
}

function js() {
    return gulp
        .src([folders.src + 'js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('backend-template.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(folders.dest + '/js/'));
}

gulp.task('build', gulp.series(static, fonts, css, js));
