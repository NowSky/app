

	// search area events
	$('#autocomplete').on({
		mouseenter: function(){
			$(this).attr('placeholder', '');
		},
		mouseleave: function(){
			$(this).attr('placeholder', 'Your Locale.');
		},
		onblur: function(){
			$(this).attr('placeholder', 'Your Locale.');
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


var nowskySearch = function(searchVal){
	$.get( "../location/" + searchVal, function(data) {
		//var items = [];
	//	$.each( data, function( key, val ) {
	//	items["name"].push( "<li id='" + key + "'>" + val + "</li>" );
	//	});
		
		

		data.forEach(function(item){
			var eventName = item["name"];
			console.log(item["name"]);
			var result = "<li class='featured-event-item'>Event: " + eventName + " is occuring at " + item["hour"] + " GMT. It will be " + item["condition"] + " when this event occurs near you.</li>";
			if(eventName === "Meteor Shower"){
				var meteorSVG = '<iframe src="./meteors-svg.html" class="meteors-frame" scrolling="no"></iframe>';
				$('.featured-event-item').append(meteorSVG);
			}
			$('.featured-events-list').append(result);
			

		});

		/* $( "<ul/>", {
			"class": "my-new-list",
			html: items.join( "" )
		}).appendTo( "body" ); */
		console.log(data);
	});
}

function GetUrlValue(VarSearch){
	var SearchString = window.location.search.substring(1);
	var VariableArray = SearchString.split('&');
	for(var i = 0; i < VariableArray.length; i++){
		var KeyValuePair = VariableArray[i].split('=');
		if(KeyValuePair[0] == VarSearch){
			return KeyValuePair[1];
		}
	}
}

$("#autocomplete").val(GetUrlValue("userInput")).change();
nowskySearch(GetUrlValue("userInput") /* ,$('#myfilter').val() */ );
