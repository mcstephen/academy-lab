//Libary construct
var library = function(){};
//Book obj
function Book (title, auth, numPages, pubDate){
  this.title = title;
  this.author = auth;
  this.numberOfPages = numPages;
  this.publishDate = new Date(pubDate);
};
//Lib Instance
var gLib = new library();

//Book Instances
var gIT = new Book("IT", "Stephen King", 800, "December 17, 1995 03:24:00");
var gCatherInTheRye = new Book("Catcher In The Rye", "JD Salinger", 200, "December 25, 1987 10:24:00");
