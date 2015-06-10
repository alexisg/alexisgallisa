// This setup will compile sass, run autoprefixer and then launch webhook's default grunt tasks.
// I also uses webhook's build-static task so that it only builds the css and
// allows livereload to refresh the css alone instead of refreshing the entire page.

'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['sass/**/*.{scss,sass}'],
        // Run sass, then autoprefixer, then webhooks build-static to build just the static files and have instantaneous live reload on css changes
        tasks: ['sass', 'combine_mq', 'autoprefixer', 'build-static']
      }
    },
    sass: {
      options: {},
      dist: {
        files: {
          'static/css/alexis.css': 'sass/alexis.sass'
        }
      }
    },
    exec: {
      kss: {
        cmd: './node_modules/.bin/kss-node sass pages/styleguide --css /static/css/style.css --template styleguide-template'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
        // map: true
      },
      dist: {
        src: 'static/css/*.css'
      }
    },
    combine_mq: {
      dist: {
        options: {
          beautify: true
        },
      src: 'static/css/alexis.css',
      dest: 'static/css/alexis.css'
    }
    },
    open: {
      svgdemo : {
        path: 'http://localhost:2002/svg/'
      },
      kss : {
        path: 'http://localhost:2002/styleguide/'
      }
    },
    rename: {
      // Import the Webhook affix JS
      svgdemo: {
        files: [
          {src: ['static/images/sprite-demo.html'], dest: 'pages/svg.html'}
        ]
      }
    },

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
  });

  // In a normal setupt you would use the register task like this in grunt
  // Since we are using webhooks internal simple watch we are going to expand on that below
  // grunt.registerTask('default', ['sass', 'autoprefixer', 'simple-watch']);

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');

  // Rename webhook's default task to wh-default so we can compile our own css first and then launch wh-default
  grunt.renameTask('default', 'wh-default');
  // grunt.registerTask('svg', ['svgstore','rename:svgdemo','open:svgdemo']);
  // grunt.registerTask('style', ['sass','autoprefixer','exec:kss', 'open:kss','wh-default']);
  // grunt.registerTask('default', ['sass','combine_mq','autoprefixer', 'cssmin','exec:kss', 'svgstore','rename:svgdemo', 'wh-default']);
  grunt.registerTask('default', ['sass','combine_mq','autoprefixer','wh-default']);

};
