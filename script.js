(function() {
	"use strict";

	$("#clear").on("click",function(){
		$("#searchBar").val("");
		document.getElementById("autocomplete").innerHTML = "";
		document.getElementById("searchBar").focus();
	});
	$(document).ready(function() {
		document.getElementById("searchBar").focus();
		$("#searchBar").on('keyup',function(e) {
			var entry = $("#searchBar").val();
			//$("#pages").fadeOut();
			if($("#searchBar").val() != "" && e.keyCode == 13){
				document.getElementById("autocomplete").innerHTML = "";
				$("#autocomplete").css("display","none");
				$.ajax({
					url:"https://en.wikipedia.org/w/api.php?",
					dataType:"jsonp",
					format:"json",
					data:"action=query&format=json&prop=&list=search&indexpageids=1&titles=&srsearch="+entry+"&srnamespace=0&srlimit=10&srqiprofile=classic_noboostlinks&srprop=sectionsnippet",
					success:callback
				});
			} else  {

				$.ajax({
					url:"https://en.wikipedia.org/w/api.php?",
					dataType:"jsonp",
					format:"json",
					data:"action=query&format=json&prop=&list=search&indexpageids=1&titles=&srsearch="+entry+"&srnamespace=0&srlimit=4&srqiprofile=classic_noboostlinks&srprop=sectionsnippet",
					success:callback2
				});
			}
		});
	});
	var callback = function(data) {
		$("#pages").css("display","none");
		document.getElementById("pages").innerHTML = "";
		document.getElementById("autocomplete").innerHTML = "";

		for (var i = 0;i < data.query.search.length;i++) {
			$.ajax({
				url:"https://en.wikipedia.org/w/api.php?",
				dataType:"jsonp",
				format:"json",
				data:"action=query&format=json&prop=extracts&list=&titles="+ data.query.search[i].title +"&exsentences=1&exlimit=10&exintro=1&explaintext=2",
				success:function(data) {
					for (var k in data.query.pages) {
						document.getElementById("pages").innerHTML += "<div class='entry'><a href = 'https://en.wikipedia.org/?curid=" + k + "'> <h2>" + data.query.pages[k].title + "</h2> " + data.query.pages[k].extract + "</a></div>";
						$("#pages").fadeIn("slow");
						break;
					}
				}
			});
		}
	};
	var callback2 = function(data) {

		document.getElementById("autocomplete").innerHTML = "";
		if ($("#searchBar").val() == ""){
			return;
		}
		try {

			for (var i = 0;i < data.query.search.length;i++) {
				$.ajax({
					url:"https://en.wikipedia.org/w/api.php?",
					dataType:"jsonp",
					format:"json",
					data:"action=query&format=json&list=&titles="+ data.query.search[i].title,
					success:function(data) {
						for (var k in data.query.pages) {
							document.getElementById("autocomplete").innerHTML += "<div class='suggestions'><a href = 'https://en.wikipedia.org/?curid=" + k + "'> <h4>" + data.query.pages[k].title + "</h4> </a></div>";
							$("#autocomplete").css("display","block");
							break;
						}
					}
				});
			}
		}
		catch (e) {
			return;
		}
	};
}());
