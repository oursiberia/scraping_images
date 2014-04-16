exports.index = function(req, res){
	if (req.method == "GET"){	
		res.render('index', { title: 'scraping stuff' });
	} 
};