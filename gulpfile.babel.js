import gulp from 'gulp';
import gutil from 'gulp-util';
import svgSprite from 'gulp-svg-sprite';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';




const dirs = {
  src : './src',
  dest: './dist',
  assets : './assets'
};

gulp.task('webpack', (callback) => {
  webpack(config, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({

    }));

    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  let compiler = webpack(config);

  new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }).listen(3000, 'localhost', (err) => {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
  });
});

gulp.task('default', () => {
  gulp.src(`${dirs.src}/app.js`)
    .pipe(gulp.dest(`${dirs.dest}`));
});


gulp.task('svg', () => {
  gulp.src(`${dirs.assets}/icons/*.svg`)
    .pipe(svgSprite({
      shape : {
        id : {
          separator : '_',
          generator : 'icon--%s'
        }
      },
      mode : {
        symbol : {
          dest : 'icon',
          sprite : 'sprites.svg'
        }
      }
    }))
    .pipe(gulp.dest(`${dirs.dest}`));
});

