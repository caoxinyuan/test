	;$(function(){
		$("#footer").load("footer.html",function(){
			$("<link />").appendTo($("head")).attr({rel:"stylesheet",href:"css/footer.css"});
		}).css({
			"width":screen.availWidth,
			"margin":"0 auto"
		});
	})