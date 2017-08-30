import * as express from 'express';

import * as path from 'path';

let router = express.Router();

router.route('/')
		.all((req,res,next)=>{
			return next();
		})
		.get((req,res,next)=>{
			return res.sendFile(path.join(__dirname, '../../../public/home.html'));
		})
	// .post()
	// .put()
	// .delete()
	// .head() // get head info
	// .trace() //  echo's back input back to the user

router
	.route('*')
		.all(function(req, res, next){
			res.send({ status: 404, message: "URL does not exist" });
		})

module.exports = router;
