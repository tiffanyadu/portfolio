$(document).ready(function () {
	var body = $('body');
	var navbar = $('.navbar-default');
	var offsetY = navbar.offset().top + 9;
	var overlay = $('.overlay');
	var menuButton = $('button.navbar-toggle');
	var menuIcon = $('.navbar-toggle .glyphicon');
	var collapsedMenu = $('.navbar-collapse.collapse');
	var collapsedMenuItem = $('.navbar-collapse.collapse li');
	var modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var scrollButton = $('.scroll');

	// Fixed Nav after scroll
	function scroll() {
		if ($(window).scrollTop() >= offsetY) {
			navbar.addClass('menu-fixed').css('background-color', 'rgba(255,254,253,0.97)');
		} else {
			navbar.removeClass('menu-fixed').css('background-color', 'transparent');
		}
	}
	document.onscroll = scroll;

	// Mobile Menu Icon Toggle
	menuButton.on('click', function () {
		if (menuIcon.hasClass('glyphicon-menu-hamburger')) {
			openMenu();
			// Close menu after clicking a link
			collapsedMenuItem.on('click', function () {
				$('.navbar-toggle').click(); // Trigger collapse animation
				closeMenu();
			});
		} else {
			closeMenu();
		}
	});
	// Collapse menu on resize
	$(window).resize(closeMenu());
	function openMenu () {
		menuIcon.removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove active');
		body.append(modalBackdropDiv);
		if (!navbar.hasClass('menu-fixed')) {
			navbar.css('background-color', 'rgba(255,254,253,0.97)');
		}
		//overlay.stop(true,true).fadeTo(200,0.6).css('z-index', '1000');
		// Close menu after clicking modal-backdrop
		modalBackdropDiv.on('click', function () {
			$('.navbar-toggle').click();
			closeMenu();
		});
	}
	function closeMenu () {
		menuIcon.removeClass('glyphicon-remove active').addClass('glyphicon-menu-hamburger');
		modalBackdropDiv.remove();
		if (!navbar.hasClass('menu-fixed')) {
			navbar.css('background-color', 'transparent');
		}
		//overlay.stop(true,true).fadeTo(200,0).css('z-index', '-1');
	}

	// Smooth scroll to content
	scrollButton.on('click', function () {
		var link = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(link).offset().top - 60
		}, 900);
	});

	// Keep last few words of paragraph together
	function noMoreLonelyWords (selector, numWords) {
    // Get array of all the selected elements
    var elems = document.querySelectorAll(selector);
    for(var i = 0; i < elems.length; ++i){
      // Split the text content of each element into an array
      var textArray = elems[i].innerText.split(" ");
      // Remove the last n words and join them with a none breaking space
      var lastWords = textArray.splice(-numWords, numWords).join("&nbsp;");
      // Join it all back together and replace the existing text with the new text
      var textMinusLastWords = textArray.join(" ");
      elems[i].innerHTML = textMinusLastWords + " " +  lastWords;
    }
  }
  noMoreLonelyWords("p", 2);

});