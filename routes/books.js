var express = require('express');
var Book = require('../models').Book;
var router = express.Router();

router.get('/viewall', function (req, res){
    console.log('getting all books');
	let users;
	start();
	async function start() {
  id = await Book.findAll().map(el => el.get('id'))
  title = await Book.findAll().map(el => el.get('title'))
  author = await Book.findAll().map(el => el.get('author'))
  category = await Book.findAll().map(el => el.get('category'))
  console.log('printing all books');
console.log(title);
var i;
var arr="";
for(i=0;i<id.length;i++)
{
	var str=id[i].toString();
	str+=" ".concat(title[i].toString()," ");
	str+=author[i].toString().concat(" ");
	str+=category[i].toString().concat(" ");
	
	arr+=str.concat("<br>");
	}
	console.log(arr);
	res.send(arr);
}

    /*Book.findAll({raw:true}).then(books => {
		res.send(books.get({ plain: true }));
    });*/

});

router.get('/search', function(req, res){
    console.log('getting one book'+req.query.id);
    Book.findById(req.query.id).then(book => {
        console.log(book.id+" "+book.title+" "+book.author+" "+book.category);
        res.send(book.id+" "+book.title+" "+book.author+" "+book.category);
    });
    /* another ways to do it
    Book.findOne({ where: {id: req.params.id} }).success(book => {
        console.log(book);
        res.json(book);
    }).error(err => {
        res.send('error has occured');
    });
    */
});

router.post('/', function(req, res){
        console.log("posting");
        console.log(req.body.title);
    Book.create({ 
	id: req.body.id	, 
        title: req.body.title,
        author: req.body.author,
	category:  req.body.book
    }).then(book => {
        console.log(book.get({
          plain: true
        }));
    });
});

router.post('/update', function(req, res){
        console.log("updating");
    Book.update({
	id: req.body.id	, 
        title: req.body.title,
        author: req.body.author,
	category:  req.body.book
    },{ 
        where: { id: req.body.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

router.get('/delete', function(req, res){
    Book.destroy({ 
        where: { id: req.query.id } 
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;