// We commonly need to grab the url where we are or came from for our animation scenes
// By default this will return a string enter- + the url path without domain
var getEnterExitString = function(e) {
  var url = e + '-' + $(location).attr('pathname').replace(/\//g, '');
  console.log(url)
  return url;
}


// On Document Ready
$(function() {

  $('#js-main').attr('data-enter', getEnterExitString('enter'));

  // Video loader if you are on not on a touch device
  var videoLoad = function() {
    $('.js-media-hold').each(function() {
      var url_video = $(this).attr("data-video");
      if (!Modernizr.touch && Modernizr.video.h264 && url_video) {
        $(this).append("<video autoplay loop class='aspect__fill'><source src='" + $(this).attr("data-video") + " 'type='video/mp4'></video>");
      } else {
        $(this).append("<img class='aspect__fill' src='" + $(this).attr("data-img") + " ' />");
      }
    })
  };

  // If not on a touch device use smoothState
  if (!Modernizr.touch) {
    'use strict';
    var $body = $('html, body'),

    smoothState = $('#js-main').smoothState({

      //smoothState options
      prefetch: true,
      pageCacheSize: 8,
      blacklist: ".no-smoothstate, [target], [data-type='image'] a",

      onStart: {
        duration: 1000,
        render: function($container) {
          $('#js-main').attr('data-exit', getEnterExitString('exit'));
          // Scroll page back up
          $body.animate({ scrollTop: 0 });
          // Set classes for animation fading
          $('#js-main')
            .removeClass('transition-start')
            .addClass('transition-end');
        }
      },

      // OnBefore
      onBefore: function($currentTarget, $content) {
        // Create a data attribute called exit- which lets the next scene know where it came from.
        // Get the string value from getEnterExitString
        // $('#js-main').attr('data-exit', getEnterExitString('exit'));
      },

      onAfter: function($container, $newContent) {
        // Add the transition start class for transitions duh
        $('#js-main')
          .removeClass('transition-end')
          .addClass('transition-start')
          .attr('data-enter', getEnterExitString('enter'));
        videoLoad();
      }
    }).data('smoothState');

  }

  // Kick off video load function
  videoLoad();
  // Kick off the animation class on first load since smoothstate is not yet available
  $('#js-main').addClass('transition-start');
  $('#js-main').smoothState();

});
