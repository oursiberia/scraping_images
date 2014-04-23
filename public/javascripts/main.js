$(document).ready(function(){
	console.log('mainjs here');

	if ($('.results').html().length == 0){
		$('.instructions').show();
	}

	$('.item').each(function(i, element){
		var me = this;
		var bg = $(me).css('background-image');
		var bgUrl = bg.replace(/"/g,"").replace(/url\(|\)$/ig, "");
		var image = new Image();
		image.src = bgUrl;
		image.onload = function(){
			if (this.width * this.height > 40000){
				$(me).parent().show();
				$(me).attr('data-dimensions', this.width + ' x ' + this.height);
			}
		};
	});
	
});