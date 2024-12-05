import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";

const sass = gulpSass(dartSass);

// Caminhos
const paths = {
    styles: {
      src: "source/main.scss", // Caminho do arquivo SASS principal
      dest: "build/styles"    // Destino para o CSS compilado
    },
    scripts: {
      src: "source/scripts/**/*.js", // Caminho para os arquivos JavaScript
      dest: "build/js"               // Destino para os JS minificados
    },
    images: {
      src: "source/images/**/*", // Caminho para as imagens
      dest: "build/images"       // Destino para as imagens otimizadas
    }
    };
    
// Compilação de SASS
export function compileSass() {
    return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest));
}

// Compressão de imagens
export function compressImages() {
    return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Compressão de JavaScript
export function compressJS() {
    return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Observa alterações nos arquivos
export function watchFiles() {
    gulp.watch(paths.styles.src, compileSass);
    gulp.watch(paths.scripts.src, compressJS);
    gulp.watch(paths.images.src, compressImages);
}

// Exporta tarefas
export const watch = gulp.series(
    gulp.parallel(compileSass, compressImages, compressJS),
    watchFiles
);

export default gulp.series(
    gulp.parallel(compileSass, compressImages, compressJS)
);
