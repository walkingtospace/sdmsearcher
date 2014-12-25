
/*
 * Error Controller
 */

exports.response = function(req, res, code) {
	switch(code) {
		case 404 :
			error404(req, res);
			break;
	}
};

function error404(req, res) {
	res.status(404);

	res.format({
		html : function() {
			res.render('error/404', { url: req.url });
		},
		json : function() {
			res.send({ error: 'Not found' });
		}
	});
}