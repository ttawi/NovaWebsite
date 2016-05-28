$(document).ready(function() {
  $('ul.form li a').click(function(e) {
    //e.preventDefault(); // prevent the default action
    //e.stopPropagation; // stop the click from bubbling
    $(this).closest('ul').find('.selected').removeClass('selected');
    $(this).parent().addClass('selected');
  });
  // $( "body" ).scrollLeft(0);






  // get each img's mid line position and store them in an array.
  var imgs = $("#album img");
  var imgArr = [];
  for (var i = 0; i < imgs.length; i++) {
    var thisImg = $("#album img:nth-child(" + (i + 2) + ")");
    var thisImgPosition = thisImg.offset();
    imgArr[i] = Math.round(thisImgPosition.left + thisImg.width() / 2 - $(window).scrollLeft());
  }

  console.log(imgArr);


  var nthImg = 2;
  $("body").mousewheel(function(event, delta) {
    console.log(this);
    if (this.scrollLeft != 0 || delta < 0) {
      this.scrollLeft -= (delta * 50);
    }
    event.preventDefault();
  }); 
  $("#album").click(function(event) {
  //  var body = $("body");
    var body = document.getElementsByTagName("body")[0];
    var mouseX = event.clientX;

    // Get current imgs' middle positions.
    for (var i = 0; i < imgs.length; i++) {
      var thisImg = $("#album img:nth-child(" + (i + 2) + ")");
      var thisImgPosition = thisImg.offset();
      imgArr[i] = Math.round(thisImgPosition.left + thisImg.width() / 2 - $(window).scrollLeft());
    }
    console.log(imgArr);
    // Select which img should be positioned middle.
    var imgToBeMid = null;
    for (var i = 0; i < imgs.length; i++) {
      if (imgArr[i] > $(window).width() / 2) {
        imgToBeMid = imgArr[i];
      }
    }
    console.log(body);
    var imgToBeMid = null;
    if (mouseX < 960) {
      for (var i = imgs.length - 1; i >= 0; i--) {
        if (imgArr[i] < $(window).width() / 2) {
          imgToBeMid = imgArr[i];
          break;
        }
      }
    } else {
      for (var i = 0; i < imgs.length; i++) {
        if (imgArr[i] > $(window).width() / 2) {
          imgToBeMid = imgArr[i];
          break;
        }
      }
    }
    if (imgToBeMid != null) {
      var scrollDistance = imgToBeMid - $(window).width() / 2;
      $('html, body').animate({
        scrollLeft: "+=" + scrollDistance
      }, 150);
    }
    event.preventDefault();
  });
    
   
   

});

