

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
		


		data.forEach(function(item)
					 {
						 console.log(item["name"]);
						 var result = "<li>Event: " + item["name"] + " is occuring at " + item["hour"] + " GMT. It will be " + item["condition"] + " when this event occurs near you.</li>";
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
