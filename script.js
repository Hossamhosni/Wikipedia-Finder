(function() {
	"use strict";
	var titles = [];
	var links;
	var sentences;
	var callback = function(data) {
		for (var i = 0;i < data.query.search.length;i++) {
			titles[i] = data.query.search[i].title;
			$.ajax({
				url:"https://en.wikipedia.org/w/api.php?",
				dataType:"jsonp",
				format:"json",
				data:"action=query&format=json&prop=extracts&list=&titles="+ titles[i] +"&exsentences=1&exlimit=10&exintro=1&explaintext=1",
				success:function(data) {
					for (var k in data.query.pages) {
						links= "https://en.wikipedia.org/?curid=" + k;
						sentences = data.query.pages[k].extract;
						console.log(sentences);
						break;
					}
					$("")
				}
			})
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
