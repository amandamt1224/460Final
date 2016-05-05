var express = require('express');
var router = express.Router();
var databaseURL = "mongodb://heroku_lx4hjpkv:t4cvpssm2e00h0o6odjdv5ecng@ds043324.mongolab.com:43324/heroku_lx4hjpkv";


var mongoose = require('mongoose').connect(databaseURL);

(mongoose.connection).on('error', console.error.bind(console, 'connection error:'));
Schema = mongoose.Schema;
var db = {};
var keySchema = new Schema({userCode: String, key: String});
var unlockKey = mongoose.model('comments',keySchema);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.post('/api/getKey/*', function(req, res){
    var code = require('url').parse(req.url,true)['query']['code'];
    var cleanCode = sanitize(projectName);
    var query = unlockKey.find({project: cleanCode})
        .populate("_id.key");

    query.exec(function (err, projectComments) {
        if (err) {
            return console.log(err);
        }

        else{
            console.log(projectComments);
            console.log('Found!');
            res.send(projectComments);
        }
    });


});

module.exports = router;
