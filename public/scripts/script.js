var geoLoco = document.getElementById("demo");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.watchPosition(showPosition);
    } else{geoLoco.innerHTML = "Geolocation is not supported by this browser.";}
  }

function showPosition(position)
  {
  geoLoco.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude; 
}

$(function(){
	
	// search area events
	$('#autocomplete, #location-3-icon').on({
		mouseenter: function(){
			$(this).attr('placeholder', '');
			$('.map-pin-icon').css('opacity', 1);
		},
		mouseleave: function(){
			$(this).attr('placeholder', 'Your Locale.');
			$('.map-pin-icon').css('opacity', 0.8);
		},
		onblur: function(){
			$(this).attr('placeholder', 'Your Locale.');
			$('.map-pin-icon').css('opacity', 0.8);
		}
	}); // search area events end
	
	// map pin events
	$('#myLocale').on({
		mouseenter: function(){
			$(this).popover('show');
		},
		mouseleave: function(){
			$(this).popover('hide');
		}
	}); // map pin end
	
	// search-area scroll past events 
	function scrolledPast(){
		$('.content-wrapper').css('opacity', 1);
		$('.search-element').css('opacity', 0);
	}
	function scrolledUp(){
		$('.content-wrapper').css('opacity', 0);
		$('.search-element').css('opacity', 1);
	}
	
	window.onscroll = function(){
	document.documentElement.scrollTop || document.body.scrollTop > 303 ?
		scrolledPast()
		: scrolledUp();
	} // search-area scroll-past end

	
});