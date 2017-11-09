module.exports = function (grunt) {

    var d = {
        bower: 'bower_components/',
        path: ''
    };

    var path = {
        root: d.path,
        css: d.path + 'assets/css/',
        scss: d.path + 'assets/scss/',
        js: d.path + 'assets/js/',
        img: d.path + 'assets/img/',
        fonts: d.path + 'assets/fonts/'
    };

    grunt.initConfig({
        config: {path: d.path},

        clean: {
            junk: ['**/.DS_Store', '**/Thumbs.db', path.scss + 'vendor/*.css', '!' + path.scss + 'vendor/*.min.css']
        },

        copy: {
            css: {
                files: [{
                    src: [
                        d.bower + 'bootstrap/dist/css/bootstrap.min.css',
                        d.bower + 'bootstrap/dist/css/bootstrap.min.css.map'
                    ],
                    dest: path.css,
                    expand: true,
                    flatten: true
                }, {
                    src: [
                        d.bower + 'tether/dist/css/tether-theme-basic.css'
                    ],
                    dest: path.scss + 'vendor',
                    expand: true,
                    flatten: true
                }]
            },
            js: {
                files: [{
                    src: [
                        d.bower + 'jquery/dist/jquery.slim.min.js',
                        d.bower + 'jquery/dist/jquery.slim.min.map',
                        d.bower + 'bootstrap/dist/js/bootstrap.min.js',
                        d.bower + 'tether/dist/js/tether.min.js'
                    ],
                    dest: path.js + 'vendor',
                    expand: true,
                    flatten: true
                }]
            },
            fonts: {
                files: [{
                    src: [
                        //d.bower + 'font-awesome/fonts/fontawesome-webfont.*'
                    ],
                    dest: path.fonts,
                    expand: true,
                    flatten: true
                }]
            }
        },

        cssmin: {
            vendor: {
                files: [{
                    expand: true,
                    cwd: path.scss + 'vendor',
                    src: ['*.css', '!*.min.css'],
                    dest: path.scss + 'vendor',
                    ext: '.scss'
                }]
            },
            style: {
                files: [{
                    expand: true,
                    cwd: path.css,
                    src: ['styles.css'],
                    dest: path.css,
                    ext: '.min.css'
                }]
            }
        },

        sass: {
            default: {
                files: [{
                    expand: true,
                    cwd: path.scss,
                    src: ['styles.scss'],
                    dest: path.css,
                    ext: '.css'
                }]
            }
        },

        postcss: {
            options: {
                processors: [
                    //require('postcss-focus'),
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({browsers: ['> 0.75%', 'last 5 versions', 'ie > 7']}),
                    require('css-mqpacker')({sort: true})
                ]
            },
            default: {
                files: [{
                    expand: true,
                    cwd: path.css,
                    src: ['styles.css'],
                    dest: path.css
                }]
            }
        },

        concat: {
            options: {
                separator: '\n\n\n'
            },
            default: {
                files: [{
                    src: [path.js + 'vendor/*.min.js', '!' + path.js + 'vendor/jquery.slim.min.js', '!' + path.js + 'vendor/bootstrap.min.js', '!' + path.js + 'vendor/tether.min.js'],
                    dest: path.js + 'plugins.js'
                }]
            }
        },

        watch: {
            options: {livereload: true},
            sass: {files: [path.scss + '**/*.scss'], tasks: ['css:process']}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['start', 'watch']);
    grunt.registerTask('start', ['static', 'css']);

    grunt.registerTask('static', ['static:css', 'static:js', 'copy:fonts', 'clean']);
    grunt.registerTask('static:css', ['copy:css', 'cssmin:vendor']);
    grunt.registerTask('static:js', ['copy:js', 'concat']);

    grunt.registerTask('css', ['css:process', 'css:minify']);
    grunt.registerTask('css:process', ['sass:default', 'postcss:default']);
    grunt.registerTask('css:minify', ['cssmin:style']);
};
