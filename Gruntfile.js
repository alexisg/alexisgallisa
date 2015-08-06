// This setup will compile sass, run autoprefixer and then launch webhook's default grunt tasks.
// I also uses webhook's build-static task so that it only builds the css and
// allows livereload to refresh the css alone instead of refreshing the entire page.

'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // __      ___ _____ ___ _  _
    // \ \    / /_\_   _/ __| || |
    //  \ \/\/ / _ \| || (__| __ |
    //   \_/\_/_/ \_\_| \___|_||_|
    // Who watches the Watchmen?
    // Watch Command to Auto Run Tasks When a Sass File Is Saved
    // and livereload the styleguide site

    watch: {
      sass: {
        files: ['sass/**/*.{scss,sass}'],
        // Run sass, then autoprefixer, then webhooks build-static to build just the static files and have instantaneous live reload on css changes
        tasks: ['sass', 'postcss', 'build-static']
      }
    },

    //   ___ ___  __  __ ___ ___ _    ___   ___   _   ___ ___
    //  / __/ _ \|  \/  | _ \_ _| |  | __| / __| /_\ / __/ __|
    // | (_| (_) | |\/| |  _/| || |__| _|  \__ \/ _ \\__ \__ \
    //  \___\___/|_|  |_|_| |___|____|___| |___/_/ \_\___/___/
    // Run Libsass to Compile All Sass Files

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.{scss,sass}'],
          dest: 'static/css',
          ext: '.css'
        }],
        options: {
          outputStyle: 'expanded',
          includePaths: ['bower_components']
        }
      },
    },

    //  ___  ___  ___ _____ ___ ___ ___
    // | _ \/ _ \/ __|_   _/ __/ __/ __|
    // |  _/ (_) \__ \ | || (__\__ \__ \
    // |_|  \___/|___/ |_| \___|___/___/
    // Use Postcss to run autoprefixr and combine our media queries.
    // CSSwring for minification on grunt postcss:prod

    postcss: {
      dist: {
        src: 'static/css/*.css',
        options: {
          map: false,
          processors: [
            // require("css-mqpacker"),
            require('autoprefixer-core')({browsers: 'last 2 versions,ie 8, ie 9'})
          ]
        }
      }
    },

    //  _   _ ___ ___   _ _____ ___
    // | | | | _ \   \ /_\_   _| __|
    // | |_| |  _/ |) / _ \| | | _|
    //  \___/|_| |___/_/ \_\_| |___|
    // Rung grunt devUpdate to check for newer packages

    devUpdate: {
      report: {
        options: {
          updateType: 'report', //just report outdated packages
        }
      },
      update: {
        options: {
          updateType: 'prompt', //just report outdated packages
        }
      },

    },

  });

  // In a normal setupt you would use the register task like this in grunt
  // Since we are using webhooks internal simple watch we are going to expand on that below
  // grunt.registerTask('default', ['sass', 'autoprefixer', 'simple-watch']);

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');

  // Rename webhook's default task to wh-default so we can compile our own css first and then launch wh-default
  grunt.renameTask('default', 'wh-default');
  grunt.registerTask('default', ['sass','postcss','wh-default']);

};
