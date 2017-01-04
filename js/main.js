// CV Initilization
$(function(){
	animateNavigation();
	skillsetChart(skillset.general);
	changeSkillSet();
	scrollAnimations();
	activateMenuToggle();
});


function scrollAnimations() {
	var sections = $('.section'),
		positionTrigger = $(window).height()*0.6,
		lastOffset = 0,
		newOffset = 0;

	sections.addClass('inactive');

	$(window).scroll(function(){
		newOffset = $(window).scrollTop();

		// Hide navigation
		if (lastOffset < newOffset) {
			$('#header').addClass('hide');
		} else {
			$('#header').removeClass('hide');
		}		

		lastOffset = newOffset;

		// Animate sections
		if ( sections.length ) {
			sections.each(function(){			
				if ( newOffset > ($(this).offset().top - positionTrigger) ) {
					$(this).removeClass('inactive');
				}
			});
			sections = $('.inactive');			
		} 

	})
}

function activateMenuToggle() {
	var menu = $("#menu")

	$('#menu-toggle').click(function (){
		menu.toggleClass('show');
	})

	$('#menu a').click(function (){
		menu.removeClass('show');
	})
}

function animateNavigation() {	
	$('a').click(function() {
		var destination = $(this).attr('href');

		if ( destination && destination[0] == "#" ) {
			event.preventDefault();
			scrollTo(destination)
		}
	});
}

function scrollTo(id) {
	var scroll = $(id).offset().top;

	if (scroll > 0) scroll = scroll - 60;

	$('html, body').animate({
	    scrollTop: scroll
	 }, 600);	
}


