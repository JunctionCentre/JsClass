var express=require("express");
var app=express();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');
var pg = 1;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3vvio90e',
    database: 'school'
});
var url = "http://tieba.baidu.com/f?kw=%E4%B8%8A%E6%B5%B7%E5%AF%B9%E5%A4%96%E7%BB%8F%E8%B4%B8%E5%A4%A7%E5%AD%A6";

app.get("/",function(req,res){
    connection.query(
        'DELETE FROM spider'
    );
    request(url, function (err, response, body){
        if (err) throw err;
        $ = cheerio.load(body);
        var list = $('#content_wrap a.j_th_tit')
        for(var i=0;i<list.length;i++){
            var title = list.eq(i).attr('title');
            var href = list.eq(i).attr('href');
            console.log(title,href);
            connection.query(
                'INSERT INTO spider (title,href) VALUES(?,?)',
                [title, href],
                function (error, results, fields) {
                    if (error) console.log(error);
                }
            );
        }
        connection.query(
            'SELECT * FROM spider',
            function (error, results, fields) {
                if (error) throw error;
                res.render("tieba", { "data": results,"pg":pg });
            }
        );    
    });
    
});

app.get("/jump",function(req,res){
    pg = req.query.page;
    url = "http://tieba.baidu.com/f?kw=%E4%B8%8A%E6%B5%B7%E5%AF%B9%E5%A4%96%E7%BB%8F%E8%B4%B8%E5%A4%A7%E5%AD%A6&pn="+(pg-1)*50;

    connection.query(
        'DELETE FROM spider'
    );
    request(url, function (err, response, body){
        if (err) throw err;
        $ = cheerio.load(body);
        var list = $('#content_wrap a.j_th_tit')
        for(var i=0;i<list.length;i++){
            var title = list.eq(i).attr('title');
            var href = list.eq(i).attr('href');
            console.log(title,href);
            connection.query(
                'INSERT INTO spider (title,href) VALUES(?,?)',
                [title, href],
                function (error, results, fields) {
                    if (error) console.log(error);
                }
            );
        }
        connection.query(
            'SELECT * FROM spider',
            function (error, results, fields) {
                if (error) throw error;
                res.render("tieba", { "data": results,"pg":pg });
            }
        );    
    });
    
});

app.listen(3000);