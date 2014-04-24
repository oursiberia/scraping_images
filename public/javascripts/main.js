$(document).ready(function(){
	console.log('mainjs here');

	$('.item').each(function(i, element){
		var me = this;
		var bg = $(me).css('background-image');
		var bgUrl = bg.replace(/"/g,"").replace(/url\(|\)$/ig, "");
		var image = new Image();
		image.src = bgUrl;
		image.onload = function(){
			if (this.width * this.height > 40000){
				$('.instructions').hide();
				$(me).parent().show();
				$(me).attr('data-dimensions', this.width + ' x ' + this.height);
			} else {
				$(me).parent().remove();
			}
			// if ($('.results').is(':empty')){
			// 	$('.instructions').show();
			// }
		};
	});

});