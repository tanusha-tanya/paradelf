'use strict';

var gulp = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  spritesmith = require('gulp.spritesmith'),
  svg = require('gulp-svg-sprite'),
  useref = require('gulp-useref'),
  size = require('gulp-size'),
  cache = require('gulp-cache'),
  imagemin = require('gulp-imagemin'),
  wiredep = require('wiredep').stream,
  del = require('del'),
  browserSync = require('browser-sync').create();

var reload = browserSync.reload;

/*gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(changed('.tmp/styles'))
    .pipe(sass())
    .pipe(prefix({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('.tmp/styles'))
});*/

gulp.task('styles', function() {
  return gulp.src('app/styles/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', sass.logError))
    .pipe(prefix({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(changed('.tmp/scripts'))
    .pipe(gulp.dest('.tmp/scripts'))
});

gulp.task('template', function () {
  return gulp.src('app/templates/*.pug')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(changed('.tmp'))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('.tmp'))
});

/**
 * ФОРМИРОВАНИЕ СПРАЙТА.
 * В gulp.src указываем папку для конкретного набора спрайтов,
 * чтобы не раздувать какой то один спрайт.
 * В итоге у нас получится несколько спрайтов для конкретных страниц/экранов
 */
gulp.task('sprites', function() {
  var prefix = 'med';
  var data = gulp.src('app/images/' + prefix + '-sprites/*.png')
    .pipe(spritesmith({
      retinaSrcFilter: 'app/images/' + prefix + '-sprites/*-2x.png',
      imgName: prefix + '-sprite.png',
      retinaImgName: prefix + '-sprite-2x.png',
      cssName: '_' + prefix + '-sprite.scss',
      retinaImgPath: '../images/' + prefix + '-sprite-2x.png',
      imgPath: '../images/' + prefix + '-sprite.png',
      algorithm: 'top-down',
      cssVarMap: function (sprite) {
        sprite.name = prefix + '_' + sprite.name;
      }
    }));

  data.img.pipe(gulp.dest('app/images'));
  data.css.pipe(gulp.dest('app/styles'));
});

var config = {
  mode: {
    symbol: {
      sprite: 'sprite.svg',
      dest: '',
      example: true
    },
  }
};

gulp.task('svg', function () {
  return gulp.src('app/images/svg/**/*.svg')
    .pipe(svg(config))
    .pipe(gulp.dest('app/images'));
});

gulp.task('html', ['template', 'styles', 'scripts'], function() {
  return gulp.src(['app/*.html', '.tmp/*.html'])
    .pipe(useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ cleanupIDs: false }]
    })))
    .pipe(gulp.dest('dist/images'));
});

// inject bower components
gulp.task('wiredep', function() {
    gulp.src('app/styles/main.scss')
        .pipe(wiredep({ignorePath: /^(\.\.\/)+/}))
        .pipe(gulp.dest('app/styles'));

    gulp.src(['app/templates/_layouts/*.pug'])
        .pipe(wiredep({ignorePath: /^(\.\.\/)*\.\./}))
        .pipe(gulp.dest('app/templates/_layouts'));
});

gulp.task('extras', function() {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    '!app/*.pug'
  ], {
      dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Gulp watch
gulp.task('watch', function () {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/templates/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/templates/**/*.pug', ['template']);
  gulp.watch('app/images/svg/**/*.svg', ['svg']);
  gulp.watch('app/images/sprite/**/*.png', ['sprites']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('s', ['styles', 'scripts', 'template', 'sprites', 'svg', 'watch'], function() {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      },
      files: [".tmp/styles/*.css", ".tmp/*.html", ".tmp/scripts/*.js"]
    }
  });

  browserSync.watch('.tmp/**/*.*').on('change', reload);
});

gulp.task('s:d', function() {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['html', 'images', 'extras'], function() {
  return gulp.src('dist/*').pipe(size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});