module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 2. Configuration for plugins goes here.
    compass: {
        dist: {
            options: {
                outputStyle: 'expanded', //Nested, expanded, compact, compressed
                //sassDir: 'Assets/sass',
                //cssDir: 'Assets/stylesheets',
            },
            files: {
              "Assets/stylesheets/styles.css": "Assets/sass/styles.scss"
            }
        }
    },
    sass: {
      dist: {
        options: {
          outputStyle: "expanded"
        },
        files: {
          "Assets/stylesheets/styles.css": "Assets/sass/styles.scss"
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 version', 'Safari >= 5'] // more codenames at https://github.com/ai/autoprefixer#browsers
      },
      dist: {
        expand: true,
        cwd: 'Assets/stylesheets/',
        src: ['*.css'],
        dest: 'Assets/stylesheets/',
      }
    },
    concat: {
      js: {
        src: [ 'Assets/js/*js', 'Assets/!js/html5shiv.js' ],
        dest: 'Assets/js/min/production.js', //Concatanate JS
      },
    },
    uglify: {
      build: {
        src: 'Assets/js/min/production.js',
        dest: 'Assets/js/min/production.js' //Minify JS
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'Assets/stylesheets/min/compiled.min.css' : ['Assets/stylesheets/styles.css']
        }
      }
    },
    watch: {
      options: {
        spawn: false,
      },
      scripts: {
        files: ['Assets/js/*.js'], //Watch JS for changes
        //tasks: ['concat', 'uglify'], //Concatanate and minify on change
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['Assets/sass/*.scss'], //Watch scss and css for changes
        //tasks: ['compass', 'newer:autoprefixer:dist', 'cssmin'], //Build CSS and minify
        tasks: ['sass', 'newer:autoprefixer:dist', 'cssmin'], //Build CSS and minify
        options: {
          spawn: false,
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['Assets/stylesheets/*.css', 'Assets/stylesheets/min/*.css', 'Assets/js/*.js', 'Assets/js/min/*.js', 'Originals/*.html']
        },
        options: {
          watchTask: true,
          //server: '.',
          proxy: 'http://www.travelclinic.local',
          ghostMode: {
            scroll: false,
            links: false,
            forms: false
          }
        }
      }
    },
    tinyimg: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'Assets/images/',
          src: ['**/*.{png,jpg,svg}'],
          dest: 'Assets/images/'
        }]
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks("grunt-sass"); // testing
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
