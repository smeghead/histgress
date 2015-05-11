$(function(){

  var images = [];
  var slider;
  //画像の取得
  var params = {};
  var d = location.hash;
  if (d) {
    params.date = d.substring(1);
  } else {
    params.date = getToday();
  }

  var changeDate = function(params){
    console.log(params);
    $('#date-picker').val(parseDate(params.date));
    $.getJSON('/get_images', params, function(data){
      console.log(data);
      if (data.images.length === 0) {
        return;
      }
      images = data.images;
      var image = images[images.length - 1];
      console.log(image);
      console.log('images.length', images.length);

      changeMap(image);
      slider = $('#timeline').slider({
        max: images.length - 1,
        value: images.length - 1,
        tooltip: 'always',
        formatter: function(value) {
          var image = images[value];
          var paths = image.url.match(/(\d{8})\/(\d{4})/)
          return paths[1].substring(0, 4) + '-' + paths[1].substring(4, 6) + '-' + paths[1].substring(6) + ' ' + 
            paths[2].substring(0, 2) + ':' + paths[2].substring(2);
        }
      });
  console.log('get_images');
    });
  };
  changeDate(params);
 
  var theWindow = $(window);
  function resizeBg() {
      var $img = $("#map"),
      aspectRatio = $img.width() / $img.height();
    if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
      $img.attr('width', '100%');
      $img.attr('height', 100 * (1 - aspectRatio) + '%');
    } else {
      $img.attr('width', 100 * (1 - aspectRatio) + '%');
      $img.attr('height', '100%');
    }
  }
  theWindow.resize(resizeBg).trigger("resize");

  function changeMap(image) {

//    var size = $('#map').css('background-size');
//    var position = $('#map').css('background-position');
//    console.log('size', size, 'position', position);

    $('#loading').show();
    document.body.style.cursor = 'wait';
    $('#map')
      .attr('src', image.url)
      .attr('width', image.width)
      .attr('height', image.height)
      .on('load', function(){
        $('#loading').hide(); document.body.style.cursor = 'default';
        //$('#map').smartZoom();
      });
    resizeBg();
//    wheelzoom(document.querySelector('img#map'));
//    console.log('size', size, 'position', position);
//    if (size != 'auto') {
//      $('#map')
//        .css('background-size', size)
//        .css('background-position', position)
//        console.log('zoom');
//    }
  }


  $('input#timeline').on('change', function(){
    if (typeof slider === 'undefined') return;
    var image = images[slider.slider('getValue')];
    if (image.src == $('#map').attr('src')) return;

    changeMap(image);
  });

  //キーボード操作
  $(window).on('keyup', function(ev){
    if (typeof slider === 'undefined') return;

    var val = slider.slider('getValue');
    switch (ev.keyCode) {
       case 39: // ->
         slider.slider('setValue', Math.min(val + 1, images.length - 1));
         break;
       case 37: // <-
         slider.slider('setValue', Math.max(val - 1, 0));
         break;
     }
  });

  //ボタン
  $('.arrow-right').on('click', function(ev){
    ev.preventDefault();
    if (typeof slider === 'undefined') return;
    var val = slider.slider('getValue');
    slider.slider('setValue', Math.min(val + 1, images.length - 1));
  });
  $('.arrow-left').on('click', function(ev){
    ev.preventDefault();
    if (typeof slider === 'undefined') return;
    var val = slider.slider('getValue');
    slider.slider('setValue', Math.max(val - 1, 0));
  });

  //date picker
  $('#date-picker').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    clearBtn: true,
  }).on('change', function(){
    console.log($(this).val().replace(/-/g, ''));
    location.href = '#' + $(this).val().replace(/-/g, '');
    changeDate({date: $(this).val().replace(/-/g, '')});
  });
});
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};
function getToday() {
    var today = new Date();
    return '' + today.getFullYear() + toDoubleDigits(today.getMonth() + 1) + toDoubleDigits(today.getDate());
}
function parseDate(yyyymmdd) {
    return yyyymmdd.substring(0, 4) + '-' + yyyymmdd.substring(4, 6) + '-' + yyyymmdd.substring(6);
}
