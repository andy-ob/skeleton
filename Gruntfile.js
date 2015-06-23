module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 2. Configuration for plugins goes here.
    sass: {
      build: {
        options: {
          outputStyle: "expanded",
          sourceComments: true
        },
        files: {
          "Assets/stylesheets/styles.css": "Assets/sass/styles.scss"
        }
      },
      prod: {
        options: {
          outputStyle: "compressed"
        },
        files: {
          "Assets/stylesheets/styles.css": "Assets/sass/styles.scss"
        }
      }
    },
    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('autoprefixer-core')({browsers: ['last 3 version', 'Safari >= 5']}), // add vendor prefixes
        ]
      },
      build: {
        src: 'Assets/stylesheets/*.css'
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
        dest: 'Assets/js/min/production.js'
      },
      minEach: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'Assets/js/',
          src: ['*.js', '!*.min.js'],
          dest: 'Assets/js/min/',
          ext: '.min.js'
        }]
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
        //tasks: ['compass', 'newer:autoprefixer:build', 'cssmin'], //Build CSS and minify
        tasks: ['sass:build', 'postcss'], //Build CSS and minify
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
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'Assets/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'Assets/images/'
        }]
      }
    },
  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks("grunt-sass"); // testing
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch'); // Watches files for changes, run 'grunt watch' will pick up sass changes and compile css
  grunt.loadNpmTasks('grunt-browser-sync'); //Create server
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('prod', ['sass:prod', 'postcss', 'concat', 'uglify:build', 'imagemin']);
};
