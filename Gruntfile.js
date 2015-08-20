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
      },
      svg: {
        files: ['static/svg/*.svg'],
        // On new or changed svg files update the svg sprite and build the demo page
        tasks: ['svgstore', 'rename:svgdemo', 'build']
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

    //  _____   _____
    // / __\ \ / / __|
    // \__ \\ V / (_ |
    // |___/ \_/ \___|

    svgstore: {
      options: {
        prefix : 'icon-', // This will prefix each ID
        includedemo : '<!doctype html><html><head><style>html {background: #6441A5;}body {background: #6441A5;max-width: 1100px;margin: 0 auto;padding: 60px 0;}svg {width: 100px;height: 100px;fill: white;position: relative;z-index: 1;-webkit-transition: all 0.25s;transition: all 0.25s;padding: 10px;-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-perspective: 1000;perspective: 1000;}ul{list-style:none;}li{display:inline-block;margin-bottom:20px;}span{display:block; font-size:12px;font-family:sans-serif;text-align:center;}</style><head><body>{{{svg}}}<ul>{{#each icons}}<li><svg><use xlink:href="#{{name}}" /></svg><span>#{{name}}</span></li>{{/each}}</ul></body></html>',
        inheritviewbox: true,
        cleanup: ['style','fill'],
        includeTitleElement: false,
        svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
          style: 'display: none'
        }
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
      default : {
        files: {
          'static/images/sprite.svg': ['static/svg/*.svg'],
        },
      },
    },

    rename: {
      // Save the SVG demo file to a webhook page
      svgdemo: {
        files: [
          {src: ['static/images/sprite-demo.html'], dest: 'pages/svg.html'}
        ]
      }
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
