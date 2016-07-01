const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const wiredep = require('wiredep').stream;
const inject = require('gulp-inject');
const nodemon = require('gulp-nodemon');

var jsfiles = ['*.js', 'src/**/*.js'];

//Wire options
var wireDepOptions = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
};

//Inject source and options
var injectSrc = gulp.src(
    [
        './public/css/*.css',
        './public/js/*.js'
    ], {
        read: false
    });

var injectOptions = {
    ignorePath: '/public'
};

//serve options
var serveOptions = {
    script: 'app.js',
    delaytime: 1,
    env: {
        'PORT': 3000
    },
    watch: jsfiles

};

gulp.task('style', () => {
    return gulp.src(jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', () => {
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(wireDepOptions))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], () => {

    return nodemon(serveOptions)
        .on('restart', (ev) => {
            console.log('Server restarting....');
        });
});