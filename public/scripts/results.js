
var nowskySearch = function(searchVal){
	$.get( "../location/" + searchVal, function(data) {
		/*var items = [];
		$.each( searchVal, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
		});

		$( "<ul/>", {
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
