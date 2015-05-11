module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 2. Configuration for plugins goes here.
    compass: {
        dist: {
            options: {
                outputStyle: 'expanded', //Nested, expanded, compact, compressed
                sassDir: 'sass',
                cssDir: 'stylesheets',
            },
        }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 version', 'Safari >= 5'] // more codenames at https://github.com/ai/autoprefixer#browsers
      },
      dist: {
        expand: true,
        cwd: 'stylesheets/',
        src: ['*.css'],
        dest: 'stylesheets/',
      }
    },
    concat: {
      js: {
        src: [ 'js/*js', '!js/html5shiv.js' ],
        dest: 'js/min/production.js', //Concatanate JS
      },
    },
    uglify: {
      build: {
        src: 'js/min/production.js',
        dest: 'js/min/production.js' //Minify JS
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'stylesheets/min/compiled.min.css' : ['stylesheets/styles.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/*.js'], //Watch JS for changes
        tasks: ['concat', 'uglify'], //Concatanate and minify on change
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['sass/*.scss'], //Watch scss and css for changes
        tasks: ['compass', 'newer:autoprefixer:dist', 'cssmin'], //Build CSS and minify
        options: {
          spawn: false,
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['stylesheets/*.css', 'stylesheets/min/*.css', 'js/*.js', 'js/min/*.js', '*.html']
        },
        options: {
          watchTask: true,
          server: '.',
          ghostMode: {
            scroll: true,
            links: true,
            forms: true
          }
        }
      }
    },
    tinyimg: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,svg}'],
          dest: 'images/'
        }]
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass'); // Compass and SASS compiling
  grunt.loadNpmTasks('grunt-contrib-cssmin'); // Css minify
  grunt.loadNpmTasks('grunt-contrib-watch'); // Watches files for changes, run 'grunt watch' will pick up sass changes and compile css
  grunt.loadNpmTasks('grunt-browser-sync'); //Create server
  grunt.loadNpmTasks('grunt-autoprefixer'); // Use specified vendor prefixes for compiled CSS
  grunt.loadNpmTasks('grunt-newer'); // Add newer: infront of a task to only account for recently edited files
  grunt.loadNpmTasks('grunt-tinyimg'); // Image optimizer

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['compass', 'newer:autoprefixer:dist', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('serve', ['browserSync', 'watch']);
};
