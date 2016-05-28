$(document).ready(function() {
  $('ul.form li a').click(function(e) {
    //e.preventDefault(); // prevent the default action
    //e.stopPropagation; // stop the click from bubbling
    $(this).closest('ul').find('.selected').removeClass('selected');
    $(this).parent().addClass('selected');
  });
  // $( "body" ).scrollLeft(0);

  // Set cursor.
  // $('body').css({'cursor': 'url(http://www.andrew-yq.com/shift90/nova/misc/cursor_right.cur), default'});




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

  // keyboard arrowkey event;
  $(window).keydown(function(event) {
    event.preventDefault();
    var kc = event.keyCode;
    // Left or right arrow key triggered
    if (kc == 37 || kc == 39) {
      // Get current imgs' middle positions.
      for (var i = 0; i < imgs.length; i++) {
        var thisImg = $("#album img:nth-child(" + (i + 2) + ")");
        var thisImgPosition = thisImg.offset();
        imgArr[i] = Math.round(thisImgPosition.left + thisImg.width() / 2 - $(window).scrollLeft());
      }

      // Select which img should be positioned middle.
      var imgToBeMid = null;
      if (kc == 37) {
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
    }
  });




  // click event;
  $("#album").click(function(event) {
    event.preventDefault();
    var mouseX = event.clientX;

    // Get current imgs' middle positions.
    for (var i = 0; i < imgs.length; i++) {
      var thisImg = $("#album img:nth-child(" + (i + 2) + ")");
      var thisImgPosition = thisImg.offset();
      imgArr[i] = Math.round(thisImgPosition.left + thisImg.width() / 2 - $(window).scrollLeft());
    }

    // Select which img should be positioned middle.
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
  });
    
   
   

});

