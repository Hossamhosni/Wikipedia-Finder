(function() {
	"use strict";
	var callback = function(data) {
		for (var i = 0;i < data.query.search.length;i++) {
			$.ajax({
				url:"https://en.wikipedia.org/w/api.php?",
				dataType:"jsonp",
				format:"json",
				data:"action=query&format=json&prop=extracts&list=&titles="+ data.query.search[i].title +"&exsentences=1&exlimit=10&exintro=1&explaintext=2",
				success:function(data) {
					for (var k in data.query.pages) {
						document.getElementById("pages").innerHTML += "<div class='entry'><a href = 'https://en.wikipedia.org/?curid=" + k + "'> <h2>" + data.query.pages[k].title + "</h2> " + data.query.pages[k].extract + "</a></div>";
						break;
					}
				}
			});
		}
	};
	$.ajax({
		url:"https://en.wikipedia.org/w/api.php?",
		dataType:"jsonp",
		format:"json",
		data:"action=query&format=json&prop=&list=search&indexpageids=1&titles=&srsearch=batman&srnamespace=0&srlimit=10&srqiprofile=classic_noboostlinks&srprop=sectionsnippet",
		success:callback
	});

}())
