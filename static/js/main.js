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

  // Video loader if you are on not on a touch device
  var videoLoad = function() {
    $('.js-video-hold').each(function() {
      var url_video = $(this).attr("data-video");
      if (!Modernizr.touch && Modernizr.video.h264 && url_video) {
        $(this).append("<video autoplay loop><source src='" + $(this).attr("data-video") + " 'type='video/mp4'></video>");
      } else {
        $(this).append("<img src='" + $(this).attr("data-img") + " ' />");
      }
    })
  };

  videoLoad();

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
        videoLoad();
      }
    }).data('smoothState');

  }

  // Kick off the animation class on first load since smoothstate is not yet available
  $('#js-main').addClass('transition-start');
  $('#js-main').smoothState();




});
