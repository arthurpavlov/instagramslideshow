var express = require('express');
var fs = require('fs');
var request = require('request');
var app     = express();
var bodyParser = require('body-parser');
var Nightmare = require('nightmare');
const cheerio = require('cheerio');
var Xvfb = require('xvfb');       


app.use(express.static(__dirname));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({   
    extended: true
}));


app.get('/', function(req, res){
    var errorMsgs = { 'errors': {} };
    res.render('mainPage', errorMsgs);
});


app.post('/', function(req, res){
    var userInput = JSON.parse(JSON.stringify(req.body));
    var url = userInput.link;
    // request(url, function(error, response, html){
    request(url, function(error, response, html){
        const $ = cheerio.load(html);
        if($('.error-container').html() != null){
            res.json({success: ['invalid_account']});
        }   
    });    
        var xvfb = new Xvfb({
        silent: true
        });
        xvfb.startSync();
         var urls = [];
       
            var nightmare = Nightmare(
            { show: true });
            nightmare.goto(url)
                .wait('body')
                .click('._1cr2e ')
                .scrollTo(6000, 0).wait(200)
                .scrollTo(6000, 0).wait(200)
                .scrollTo(6000, 0).wait(200)
                .scrollTo(10000, 0).wait(200)
                .scrollTo(10000, 0).wait(200)
                .scrollTo(20000, 0).wait(200)
                .scrollTo(20000, 0).wait(200)
                .scrollTo(20000, 0).wait(200)
                .scrollTo(50000, 0).wait(200)
                .scrollTo(50000, 0).wait(200)
                .scrollTo(50000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .scrollTo(100000, 0).wait(200)
                .evaluate(() => {
                    return document.querySelector('body').innerHTML;
                })
                .end()
                .then((result) => {
                    rex = /https:\/\/instagram\.[\w_\-\/\.]*\.jpg 640w|{"src":"https:\/\/instagram\.[\w_\-\/\.]*\.jpg","config_width":640,"config_height":640}/gi
                    while (m = rex.exec(result)) {
                        // console.log(m[0]);
                        rex2 = /https:\/\/instagram\.[\w_\-\/\.]*\.jpg/gi
                        while (m2 = rex2.exec(m[0])) {
                            // console.log(m2[0]);
                            urls.push(m2[0]);  
                        }
                    }
                    xvfb.stopSync();
                    res.json({success: urls});
                })

});


app.listen(process.env.PORT || 80);

console.log('Listening on port 80');

exports = module.exports = app;
