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
	
	// $('input.splash-head').one('mouseenter', clearInput(this));			
	$('#searchInput, #location-3-icon').on({
		mouseenter: function(){
			$(this).attr('placeholder', '');
			$('.map-pin-icon').css('opacity', 1);
		},
		mouseleave: function(){
			$(this).attr('placeholder', 'Your Locale.');
			$('.map-pin-icon').css('opacity', 0.8);
		}
	});
	
	$('#myLocale').on({
		mouseenter: function(){
			$(this).popover('show');
		},
		mouseleave: function(){
			$(this).popover('hide');
		}
	});

	
});