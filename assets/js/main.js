/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav
	var $nav = $('#nav');
	var $nav_a = $nav.find('a');

	// Side nav
	var $side_nav = $('.sidebar-wrapper .sidebar ul li');
	var $side_nav_a = $side_nav.find('a');


	if ($nav.length > 0) {

		// Shrink effect.
		$main.scrollex({
			mode: 'top',
			enter: function () {
				$nav.addClass('alt');
			},
			leave: function () {
				$nav.removeClass('alt');
			},
		});

		// Unified click handler for both nav and sidebar links
		function handleNavLinkClick(event) {
			var $this = $(this);
			var href = $this.attr('href');

			// External link? Bail.
			if (href.charAt(0) != '#') return;

			// Deactivate *all* nav links
			$nav_a.removeClass('active').removeClass('active-locked');
			$side_nav_a.removeClass('active').removeClass('active-locked');

			// Activate the clicked link
			$this.addClass('active').addClass('active-locked');

			// Use scrolly to scroll
			$(href).scrolly({
				speed: 1000,
				offset: function () { return $nav.height(); }
			});

		}

		$nav_a.on('click', handleNavLinkClick);
		$side_nav_a.on('click', handleNavLinkClick);


		// Scrollex for sections
		$nav_a.each(function () {  //Iterate through main nav, but could use side nav too.
			var $this = $(this);
			var id = $this.attr('href');
			var $section = $(id);

			if ($section.length < 1) return;

			$section.scrollex({
				mode: 'middle',
				initialize: function () {
					$section.addClass('inactive');
				},
				enter: function () {
					$section.removeClass('inactive');

					// Update active state, only if no link is "locked"
					if ($nav_a.filter('.active-locked').length === 0) {
						$nav_a.removeClass('active');
						$side_nav_a.removeClass('active');

						// Find corresponding links and activate them
						var correspondingNavLinks = $('a[href="' + id + '"]'); //Find in both nav and sidebar
						correspondingNavLinks.addClass('active');
					}
					// Unlock if this section's link was locked.
					if ($this.hasClass('active-locked')) {
						$this.removeClass('active-locked');
					}
				}
			});
		});
	}

	// Scrolly for regular links (if you have any outside nav)
	$('.scrolly').scrolly({
		speed: 1000
	});

})(jQuery);