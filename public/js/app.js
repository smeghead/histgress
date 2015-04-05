$(function(){

  var images = [];
  var slider;
  //画像の取得
  $.getJSON('/get_images', function(data){
    console.log(data);
    if (data.images.length === 0) {
      return;
    }
    images = data.images;
    var image = images[images.length - 1];
    console.log(image);
    console.log('images.length', images.length);

    $('#loading').show();
    document.body.style.cursor = 'wait';
    $('#map')
      .attr('src', image.url)
      .attr('width', image.width)
      .attr('height', image.height)
      .on('load', function(){ $('#loading').hide(); document.body.style.cursor = 'default';});
      resizeBg();
    slider = $('#timeline').slider({
      max: images.length - 1,
      value: images.length - 1,
      formatter: function(value) {
        console.log('format 1', value);
        var image = images[value];
        console.log('format 2', image.url);
        var paths = image.url.match(/(\d{8})\/(\d{4})/)
        console.log(paths);
        return paths[1].substring(0, 4) + '-' + paths[1].substring(4, 6) + '-' + paths[1].substring(6) + ' ' + 
          paths[2].substring(0, 2) + ':' + paths[2].substring(2);
      }
    });
  });
 
  var theWindow = $(window);
  function resizeBg() {
      var $img = $("#map"),
      aspectRatio = $img.width() / $img.height();
    console.log($img.width() + 'x' + $img.height());
    console.log('resized', theWindow.width(), theWindow.height(), aspectRatio);
    if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
      console.log('bgwidth');
      $img.attr('width', '100%');
      $img.attr('height', 100 * (1 - aspectRatio) + '%');
    } else {
      console.log('bgheight');
      $img.attr('width', 100 * (1 - aspectRatio) + '%');
      $img.attr('height', '100%');
    }
  }
  theWindow.resize(resizeBg).trigger("resize");


  $('input#timeline').on('change', function(){
      if (typeof slider === 'undefined') return;
      var image = images[slider.slider('getValue')];
      console.log(image);
      if (image.src == $('#map').attr('src')) return;

      $('#loading').show();
      document.body.style.cursor = 'wait';
      $('#map')
        .attr('src', image.url)
        .attr('width', image.width)
        .attr('height', image.height)
        .on('load', function(){ $('#loading').hide();document.body.style.cursor = 'default';});
      resizeBg();
  });
});
