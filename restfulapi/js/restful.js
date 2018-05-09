//singleton version

(function() {  //self invocking function (anon self invoke function)
    var library_instance; //define somewhere for our instances

    window.library = function() {  //replaces library constructor
      // return the instance if we already have one
      if (library_instance) {
        return library_instance;
      }
      library_instance = this; //after instance is created assign it ti our instance
    }
})();

library.prototype.allBooks = [];

var library = function (stoKey) {
  this.allBooks = [];
  this.stoKey = stoKey;

};

library.prototype._bindMyEvents = function() {
  $("#button1").on("click", $.proxy(this.getMeet, this));
 };


library.prototype._handleMyEvent = function(e){
  var $tr = $(e.currentTarget).parent("tr");
  this.allBooks.splice($tr.attr("data-id"), 1);
  $tr.remove();
  this.setLib();
  this.renderTable();
};

library.prototype.renderTable = function(){
  $("tbody").children().remove();
  for(var i=0; i < this.allBooks.length; i++){
    this.renderRow(i, this.allBooks[i]);
  }
};
library.prototype.renderRow = function(index, book){
  $("table tbody").append("<tr><td class='bookTitle'>"+book.title+"</td><td class='auth'>"+book.author+"</td><td class='numPages'>"+book.numPages+"</td><td class='delete text-center'>&#9851</td></tr>");
};

  library.prototype.myInitializationMethod = function () {
    //Anything I want kicked off on doc ready which is specific to my instance
    this._bindMyEvents();
    this.getLocStoLib();
    this.renderTable();
    this.initVars();
  };

  library.prototype.initVars = function () {

  };

$( document ).ready (function() { //Doc ready
  window.gApi = new library("gApi");
  window.gApi.myInitializationMethod();
});


library.prototype.setLib = function() {
  localStorage.setItem(this.stoKey, JSON.stringify(this.allBooks));
}
library.prototype.clrLocStoLib = function() {
  localStorage.removeItem(this.stoKey);
}
library.prototype.getLocStoLib = function() {
  var tempLocalSto = JSON.parse(localStorage.getItem(this.stoKey)) || [];
  for (var i=0; i<tempLocalSto.length; i++) {
  this.addBook(new Book(
    tempLocalSto[i].title,
    tempLocalSto[i].author,
    tempLocalSto[i].numPages,
    tempLocalSto[i].pubDate,
    tempLocalSto[i].bookImage
  ));
};
};

var Book = function (title, author, numPages, pubDate, bookImage){
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.pubDate = new Date(pubDate).toString().slice(0,15);
  this.bookImage = bookImage;
};

var gTest = new Book("War and Peace", "Leo Tolstoy", 1296, "01/01/1869", "img/war-and-peace.jpg" );

//function to load all books for testing only
library.prototype.addAllBooks = function () {
  gApi.addBook(gHitch);
  this.renderTable();
  this.setLib();
  return true;
};

// addBook(book)
// Purpose: Add a book object to your books array.
// Return: boolean true if it is not already added, false if it is already added.

library.prototype.addBook = function (newBook) {
  for (var i=0; i<this.allBooks.length; i++) {
      if (this.allBooks[i].title === newBook.title ){
        return false;
      }
    }
    this.allBooks.push(newBook);
    return true;
};


library.prototype.getBookByTitle = function (title) {
  var titleBooks = [];
  $("tbody").children().remove();
  for (var i=0; i<this.allBooks.length; i++)
    {

      if (this.allBooks[i].title.indexOf(title)  !==-1) {
        // this.allBooks[i].push(titleBooks);
        titleBooks.push(this.allBooks[i]);

      }
    }
    if ((titleBooks).length > 0) {
      for(var i=0; i < titleBooks.length; i++){
        this.renderRow(i, titleBooks[i]);
      }
      $("#compMsg" ).addClass( "d-none" );
      $("#selectFunction").val("0");
      $("#searchInput" ).addClass( "d-none" );
    return titleBooks;
} else {
    $("#compMsg").text( "No titles found with that title");
      $("#compMsg" ).removeClass( "d-none" );
      $("#selectFunction").val("0");
      $("#searchInput" ).addClass( "d-none" );
      $("tbody").children().remove();
};
};


//function for main search input
library.prototype.searchInputText = function () {
  var MysearchInput = this.$mySearchInput.val();
  var MySearchLabel = this.$mySearchLabel.text();
  this.evalSearchVal();
  this.initInput();
};
library.prototype.initInput = function () {
  $("#inputCountry").val("");
  $("#inputState").val("");
  $("#inputNumResults").val("");
}



  library.prototype.addABook = function () {
    var myTitle = $("#bookTitleInput1").val();
    var myAuth = $("#bookAuthorInput1").val();
    var myPages = $("#bookNumPageInput1").val();
    var myDate = $("#bookPubDateInput1").val();
    var myBookImage = $("#bookUrlInput1").val();
    var newTitle = new Book(myTitle, myAuth, myPages ,  myDate, myBookImage);
    $("#compMsg").addClass("d-none");
    $("#compMsg").val("");

    if (this.addBook(newTitle)  ) {
      //check is true, execute this code
      console.log("returned true not a dupe: " + newTitle);
      this.setLib();
      $("#bookTitleInput1").val("");
      $("#bookAuthorInput1").val("");
      $("#bookNumPageInput1").val("");
      $("#bookPubDateInput1").val("");
      $("#bookUrlInput1").val("");

      // below will display new title in list
      this.renderTable();
      $("#textInput").val("");
      $("#selectFunction").val("0");
      $("#inputTitleData" ).addClass( "d-none" );
    }
    else {
      $("#compMsg").removeClass("d-none");
      $("#compMsg").text("title already in library");
    }
};
library.prototype.getMeet = function(){
  var myResultStore = this.allMeet;
  $('.results').text('loading . . .');

  console.log(
    "state: " + $("#inputState").val()+
    "country: "+ $("#inputCountry").val()+
    "page: "+ $("#inputNumResults").val());
          // key: "6e3d5d1a5632351a3e4a274c3f66910"
 
    $.ajax().done(function(data){
        console.log("yeah!!!");
        $('.results').text(JSON.stringify(data));
      }).fail(function(){
        console.log("oops");
      })
    };