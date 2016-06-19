window.onresize = function() {
  //center the page as window size changes
  centering($(window).height());
}

function centering(height) {
  var margin = (height - 700) / 2;
  var page = document.getElementById("page");
  page.style.marginTop = parseInt(margin) + "px";
  page.style.marginBottom = parseInt(margin) + "px";
}

$(document).ready(function() {
  
  document.getElementById('Editorial').style.display = 'inline-flex';

  //center the initial page
  centering($(window).height());

  $('ul.form li a').click(function(e) {
    //e.preventDefault(); // prevent the default action
    //e.stopPropagation; // stop the click from bubbling
    var last = $(this).closest('ul').find('.selected');
    last.removeClass('selected');
    var toHide = last.children().html();
    document.getElementById(toHide).style.display = "none";

    $(this).parent().addClass('selected');
    var toShow = $(this).html();
    document.getElementById(toShow).style.display = "inline-flex";
  });
  // $( "body" ).scrollLeft(0);

  // Set cursor.
  // $('body').css({'cursor': 'url(http://www.andrew-yq.com/shift90/nova/misc/cursor_right.cur), default'});


  var types = ["Editorial", "Portrait", "Landscape", "Commercial", "Street"];

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
    // mid point is set based on the window width
    var imgToBeMid = null;
    var midPoint = $(window).width() / 2;
    if (mouseX < midPoint) {
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

