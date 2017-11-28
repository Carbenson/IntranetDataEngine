var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


gulp.task('watch', function () {
    gulp.watch(['scripts/*.js', '!scripts/*.min.js'], function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.src(event.path)
            // 2. 压缩文件
            .pipe(uglify({
                mangle: true
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            // 3. 另存压缩后的文件
            .pipe(gulp.dest('scripts'));
    });
});