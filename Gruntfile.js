'use strict';
module.exports = function(grunt) {

  // ----------------------------------------------------------
  // WARNING, BRAVE DEVELOPER
  // ----------------------------------------------------------
  // Webhook allows you to use local grunt tasks and files.
  // However, these tasks are ONLY RUN LOCALLY and not when
  // your live site needs to be rebuilt. This means you should
  // only use grunt for pre-processing tasks like building
  // Sass, less or coffescript files, not for reading things
  // from your templates and making dynamic changes during
  // the build process. Doing so will cause your live site
  // not to regerate.
  //
  // You have been warned!
  grunt.initConfig({

    watch: {
      sass: {
        files: ['static/sass/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      // autoprefixer: {
      //   files: ['static/css/screen.css'],
      //   tasks: ['autoprefixer']
      // }
    },

    sass: {
      options: {
        // includePaths: ['bourbon']
        // includePaths: ['bower_components/compass-mixins/lib']
        // sourceMap: true
      },
      dist: {
        files: {
          'static/css/screen.css': 'static/sass/screen.sass'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        src: 'static/css/screen.css',
        dest: 'static/css/screen-prefix.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');

};
