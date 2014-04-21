// var Images = $('img'),
// FilteredImages = Images.filter(function(){
// 	var that = this;
// 	return (that.naturalWidth == '16px') || (that.naturalHeight == '16px')
// });

// function getImgSize(imgSrc)
// {
// 	var newImg = new Image();
// 	newImg.src = imgSrc;
// 	var height = newImg.height;
// 	var width = newImg.width;
// 	alert ('The image size is '+width+'*'+height);
// }

$(document).ready(function(){
	console.log('hey there');

	// var $container = $('#container');
	// $container.isotope({
	// 	itemSelector: '.item',
	// 	filter: function(){
	// 		var bg = $(this).css('background-image');
	// 		var bgUrl = bg.replace(/"/g,"").replace(/url\(|\)$/ig, "");
	// 		var image = new Image();
	// 		image.src = bgUrl;
	// 		var area = image.width * image.height;
	// 		return area >= 1000;
	// 	}
	// });

	$('li div').each(function(i, element){
		var me = this;
		var bg = $(this).css('background-image');
		var bgUrl = bg.replace(/"/g,"").replace(/url\(|\)$/ig, "");
		var image = new Image();
		image.src = bgUrl;
		image.onload = function(){
			if (this.width * this.height < 40000){
				$(me).parent().remove();
			}
		};
	});


});