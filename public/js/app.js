$(function(){
	$('#timeline').slider({
		formatter: function(value) {
			return 'Current value: ' + value;
		}
	});

	//‰Šú‰æ‘œæ“¾
	$.getJSON('/get_images', function(data){
		console.log(data);
    if (data.images.length === 0) {
      return;
    }
    var images = data.images;
    $('#map')
      .attr('src', images[0].url)
      .attr('width', images[0].width)
      .attr('height', images[0].height);
	});

  var theWindow = $(window),
    $img = $("#map"),
    aspectRatio = $img.width() / $img.height();
  console.log($img.width() + 'x' + $img.height());
 
  function resizeBg() {
    if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
      $img.removeClass().addClass('bgheight');
    } else {
      $img.removeClass().addClass('bgwidth');
    }
  }
  theWindow.resize(function() {
    resizeBg();
  }).trigger("resize");
});
