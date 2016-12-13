// We commonly need to grab the url where we are or came from for our animation scenes
// By default this will return a string enter- + the url path without domain
var getEnterExitString = function(e) {
  var url = e + '-' + $(location).attr('pathname').replace(/\//g, '');
  console.log(url)
  return url;
}

//Init the mobile nav function
var navToggle = function (e) {
  $('body').toggleClass('is-navbar-active');
  e.preventDefault();
}

// Force collapes of the navbar on anchor links
var removeToggle = function (e) {
  $( "a" ).click(function() {
    $('body').removeClass('is-navbar-active');
  });
}

// Video loader if you are on not on a touch device
var videoLoad = function() {
  $('.js-media-hold').each(function() {
    var url_video = $(this).attr("data-video");
    if (Modernizr.video.h264 && url_video) {
      $(this).append("<label for='" + $(this).attr("data-id") + "' class='hide'>Video of " + $(this).attr("data-title") + "</label><video id='" + $(this).attr("data-id") + "' playsinline muted autoplay loop class='aspect__fill'><source src='" + $(this).attr("data-video") + " 'type='video/mp4'></video>");
    } else {
      $(this).append("<img class='aspect__fill' src='" + $(this).attr("data-img") + " ' alt='" + $(this).attr("data-title") + " ' />");
    }
  })
};

// On Document Ready
$(function() {

  'use strict';
  var $body = $('html, body'),

  smoothState = $('#js-main').smoothState({

    //smoothState options
    prefetch: true,
    pageCacheSize: 8,
    blacklist: ".no-smoothstate, [target], [data-type='image'] a",
    scroll: false,

    onStart: {
      duration: 600,
      render: function($container) {
        $('#js-main').attr('data-exit', getEnterExitString('exit'));
        // Scroll page back up
        $body.animate({ scrollTop: 0 }, 600);
        // Set classes for animation fading
        $('#js-main')
          .removeClass('transition-start')
          .addClass('transition-end');
      }
    },

    // OnBefore
    onBefore: function($currentTarget, $content) {
    },

    onAfter: function($container, $newContent) {
      // Add the transition start class for transitions duh
      $('#js-main')
        .removeClass('transition-end')
        .addClass('transition-start')
        .attr('data-enter', getEnterExitString('enter'));
      videoLoad();
      removeToggle();
    }
  }).data('smoothState');

  // On ready functions that need to be fired before smoothState is ready

  // Kick off video load function
  videoLoad();
  removeToggle();

  // Kick off the animation class on first load since smoothstate is not yet available
  $('#js-main')
    .attr('data-enter', getEnterExitString('enter'))
    .addClass('transition-start')
    .smoothState();

  // Set up navToggle Function
  $(document).on('click', '.js-nav-toggle', navToggle);

});

