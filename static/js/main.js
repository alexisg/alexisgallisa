// On Document Ready
$(function() {

  //Force all anchor links that go offsite to open in a new window
  var anchorBlank = function() {
    $('a').each(function() {
      var a = new RegExp('/' + window.location.host + '/');
      if (!a.test(this.href)) {
        $(this).click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          window.open(this.href, '_blank');
        });
      }
    });

    // $('.js-anchor-left').click(function() {
    //   console.log('left');
    //   $('#js-fade').removeClass('transition--fadeflipright').addClass('transition--fadeflipleft');
    // });

    // $('.js-anchor-right').click(function() {
    //   $('#js-fade').removeClass('transition--fadeflipleft').addClass('transition--fadeflipright');
    // });


  };

  anchorBlank();


  // If not on a touch device use smoothState
  if (!Modernizr.touch) {
    'use strict';
    var $body = $('html, body'),
    content = $('#js-main').smoothState({

      //smoothState options
      prefetch: true,
      pageCacheSize: 8,

      onStart: {
        duration: 400,
        render: function($container) {
          // Scroll page back up
          $body.animate({ scrollTop: 0 });
          // Set classes for animation fading
          $('#js-main')
            .removeClass('transition-start')
            .addClass('transition-end');
        }
      },

      onAfter: function($container, $newContent) {

        // Add the transition start class for transitions duh
        $('#js-main')
          .removeClass('transition-end')
          .addClass('transition-start');
        // On new page load, re-initialize the external url anchor function
        anchorBlank();
      }
    }).data('smoothState');

  }

  // Kick off the animation class on first load since smoothstate is not yet available
  $('#js-main').addClass('transition-start');
  $('#js-main').smoothState();


});
