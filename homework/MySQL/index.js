var express=require("express");
var app=express();
    app.set("view engine","ejs");
    app.use(express.static(__dirname+"/public"));
var ejs = require('ejs');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '3vvio90e',
  database : 'school'
});
connection.connect();


//设置路由
app.get("/",function(req,res){
    connection.query(
        'SELECT * FROM user',
        function (error, results, fields) {
            if (error) throw error;
            res.render("index", { "data": results });
        }
    );
});
app.get("/toadd",function(req,res){
    res.render("toadd");
});
app.get("/add",function(req,res){
    var name= req.query.name,
        major= req.query.major;
        connection.query(
            'INSERT INTO user (name,major) VALUES (?,?)',
            [name,major],
            function (error, results, fields) {
                if (error) throw error;
                res.redirect("/");
            }
        );
});
app.get("/tochange",function(req,res){
    connection.query(
        'SELECT * FROM user WHERE id=?',
        [req.query.id],
        function (error, results, fields) {
            if (error) throw error;
            res.render("tochange", { "data": results[0]});
        }
    );  
});
app.get("/change",function(req,res){
    var id = req.query.id,
        name = req.query.name,
        major = req.query.major;
    connection.query(
        'UPDATE user SET name=?,major=? WHERE id=?;',
        [name,major,id],
        function (error, results, fields) {
            if (error) throw error;
            res.redirect("/");
        }
    );  
});
app.get("/delete",function(req,res){
    connection.query(
        'DELETE FROM user WHERE id=?',
        [req.query.id],
        function (error, results, fields) {
            if (error) throw error;
            res.redirect("/");
        }
    );
});



app.listen(3000);