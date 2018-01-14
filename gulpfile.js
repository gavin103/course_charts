const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default',['news'],()=>{
    gulp.watch(['src/**/*.js','!src/public/*/*.js'],['news'])
});
gulp.task('news',()=>
    gulp.src(['src/**/*.js','!src/public/*/*.js'])
        .pipe(babel({
            presets: ['env','stage-0']
        }))
        .pipe(gulp.dest('build'))
)