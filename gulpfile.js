const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
    gulp.src('styles/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
    gulp.watch(["styles/*.scss", "styles/**/*.scss"], ['sass']);
});

gulp.task('default', ['sass', 'watch']);