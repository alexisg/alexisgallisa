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
  };
  anchorBlank();

  $('body').addClass('is-ready');

  // var callback = function(playerShots) {
  //   var html = '';
  //   $.each(playerShots.shots, function(i, shot) {
  //     // html += '<li><h3>' + shot.title + '</h3>';
  //     html += '<li><a href="' + shot.url + '" class="img">';
  //     html += '<img src="' + shot.image_url + '" ';
  //     html += 'alt="' + shot.title + '"></a></li>';
  //   });
  //   $('#js-dribble').html(html);
  // };
  // $.jribbble.getShotsByPlayerId('alexisg', callback, {
  //   page: 1,
  //   per_page: 8
  // });

});
