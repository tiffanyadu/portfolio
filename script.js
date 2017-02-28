$(document).ready(function () {
	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 9;
	var $menuButton = $('button.navbar-toggle');
	var $menuIcon = $('.navbar-toggle .glyphicon');
	var $collapsedMenu = $('.navbar-collapse.collapse');
	var $collapsedMenuItem = $('.navbar-collapse.collapse li');
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var $scrollButton = $('.scroll');
	var $socialIcon = $('.social');

	// Fixed Nav after scroll
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed').css('background-color', 'rgba(255,254,253,0.97)');
		} else {
			$navbar.removeClass('menu-fixed').css('background-color', 'transparent');
		}
	}
	document.onscroll = scroll;

	// Mobile Menu Icon Toggle
	$menuButton.on('click', function () {
		if ($menuIcon.hasClass('glyphicon-menu-hamburger')) {
			openMenu();
			// Close menu after clicking a link
			$collapsedMenuItem.on('click', function () {
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
		$menuIcon.removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove active');
		$modalBackdropDiv.css('z-index', 900);
		$body.append($modalBackdropDiv);
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'rgba(255,254,253,0.97)');
		}
		// Close menu after clicking modal-backdrop
		$modalBackdropDiv.on('click', function () {
			$('.navbar-toggle').click();
			closeMenu();
		});
	}
	function closeMenu() {
		$menuIcon.removeClass('glyphicon-remove active').addClass('glyphicon-menu-hamburger');
		$modalBackdropDiv.css('z-index', 1025).remove();
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'transparent');
		}
	}

	// Smooth scroll to content
	$scrollButton.on('click', function(e) {
		e.preventDefault();
		var $link = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $($link).offset().top - 60
		}, 900);
	});

	// Social icons hover effect
	$socialIcon.on({
		'focus mouseenter': function() {
			var $iconImg = $(this).children();
			var $href = $iconImg.attr('src').slice(0, -9) + 'color.svg'; // Remove 'black.svg' from end and add 'color.svg'
			$iconImg.attr('src', $href);
		},
		'blur mouseleave': function() {
			var $iconImg = $(this).children();
			var $href = $iconImg.attr('src').slice(0, -9) + 'black.svg';
			$iconImg.attr('src', $href);
		}
	});

});