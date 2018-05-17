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
  $("#MyTable").on("click", ".delete", $.proxy(this._handleMyEvent, this)); //delegation
  // $("#MyTable").on("click", ".bookTitle", $.proxy(this._titleClick, this)); //delegation
  // $(".show-auths").on("click", $.proxy(this.showauthors, this));
  $("#MyTable").on("click", "#sortTitle", $.proxy(this._handleSortTitle, this)); //delegation
  $("#MyTable").on("click", "#sortAuth", $.proxy(this._handleSortAuth, this)); //delegation
  $("#MyTable").on("click", "#sortPages", $.proxy(this._handleSortPages, this)); //delegation
  $("#runButton").on("click", $.proxy(this.searchInputText, this));
  $("#addButton").on("click", $.proxy(this.addABook, this));
  $("#selectFunction").on("change", $.proxy(this.choiceSelect, this));
  $("#randomBtn").on("click", $.proxy(this.getRandomBook, this));
  $("#modalBtn").on("click", $.proxy(this.getAuthors, this));
  $("#authorModal").on("click", ".authorLi",  $.proxy(this._handleAuthorClick, this));
//   $("#image").on("mouseover", $.proxy(this.popImage, this);
//   $("#image").on("mouseout", $.proxy(this.popImage, this);
  $(".bookTitle").on("click", $.proxy(this.coverHover, this));

//following function is done in css
//   library.prototype.popImage = function() {
//     this.allBooks(this.$($0).data("id"));
//                            $("#pop-up").show();
//    });
// $("#image").mouseout(function(){
//                            $("#pop-up").hide();
//                          });
};

library.prototype._handleAuthorClick = function(e){
  var titleResults = this.getBooksByAuthor($(e.currentTarget).text());
  // var result = $(e.currentTarget).text();
  // console.log(result);
  // console.log(event.target.innerText);
    // location.reload();
  // this.renderTable();
  $("#exampleModal").modal('hide');
  $("tbody").children().remove();
  if ((titleResults).length > 0) {
    for(var i=0; i < titleResults.length; i++){
      this.renderRow(i, titleResults[i]);
    };
  } else {
    alert("we aint got no books");
    return false;
  };
};

library.prototype._handleMyEvent = function(e){
  var $tr = $(e.currentTarget).parent("tr");
  this.allBooks.splice($tr.attr("data-id"), 1);
  $tr.remove();
  this.setLib();
  this.renderTable();
};

library.prototype._handleSortTitle = function() {
  this.allBooks.sort(function (a,b) {
    var titleA = a.title.toUpperCase();
    var titleB = b.title.toUpperCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
  this.renderTable();
};
library.prototype._handleSortAuth = function() {
  this.allBooks.sort(function (a,b) {
    var authorA = a.author.toUpperCase();
    var authorB = b.author.toUpperCase();

    if (authorA < authorB) {
      return -1;
    }
    if (authorA > authorB) {
      return 1;
    }
    return 0;
  });
  this.renderTable();
};

library.prototype._handleSortPages = function() {
  this.allBooks.sort(function (a,b) {
    var numPagesA = a.numPages;
    var numPagesB = b.numPages;

    if (numPagesA < numPagesB) {
      return -1;
    }
    if (numPagesA > numPagesB) {
      return 1;
    }
    return 0;
  });
  this.renderTable();
};

library.prototype.coverHover = function () {

  // $('#modalBtn').tooltip({content: '<img src='+"http://bento.cdn.pbs.org/hostedbento-prod/filer_public/gar-phase-2/assets/catch-22.jpg"+ '/>' });
$( ".bookTitle" ).tooltip({ content: '<img src="http://icdn.pro/images/fr/a/v/avatar-barbe-brun-homme-utilisateur-icone-9665-128.png"/>' });
};

library.prototype.renderTable = function(){
  $("tbody").children().remove();
  for(var i=0; i < this.allBooks.length; i++){
    this.renderRow(i, this.allBooks[i]);
  }
};
library.prototype.renderRow = function(i, book){
  $("table tbody").append("<tr data-id='"+this.allBooks[i]._id+"'><th scope='row'>"+" "+"</th><td class='bookTitle'>"+this.allBooks[i].title+"</td><td class='auth'>"+this.allBooks[i].author+"</td><td class='numPages'>"+this.allBooks[i].numPages+"</td><td class='delete text-center'>&#9851</td><td><img class='img-pop' src='"+"data:image/png;base64, "+this.allBooks[i].cover+"'></td></tr>");

};

  library.prototype.myInitializationMethod = function () {
    //Anything I want kicked off on doc ready which is specific to my instance
    $( "label" ).css( "font-style", "italic" );
    $( "placeholder" ).css( "font-style", "italic");
    $( "placeholder" ).css("opacity, 0.5");
    $("#btn0").show();
    // $("#myTable").tablesorter();
    this._bindMyEvents();
    this.getLocStoLib();
    $('[data-toggle="tooltip"]').tooltip();
     this.getApiData();
    // this.renderTable();
    // this.getRandomBook();
    this.initVars();
  };

  library.prototype.initVars = function () {
      this.$mySearchInput = $("#textInput");
      this.$mySearchLabel = $("#selectLabel");
  };

$( document ).ready (function() { //Doc ready
  window.gLib = new library("gLib");
  window.gLib.myInitializationMethod();
});

library.prototype.getApiData = function() {
  // event.preventDefault();
  // this.$myCountry = $("#inputCountry").val();
  // this.$myState = $("#inputState").val();
  // this.$myPages = $("#inputNumResults").val();
  $.ajax({
      dataType: 'json',
      type:"GET",
      url:"http://127.0.0.1:3000/library",

    }).done($.proxy(this._refreshDataSuccess, this)
    ).fail(function(){
      console.log("fail")
    });
};
library.prototype.postApiData = function() {
  $.ajax({
    dataType: 'json',
    type:"POST",
    url:"http://127.0.0.1:3000/library",
      data: {
         title: $("#bookTitleInput1").val(),
         author: $("#bookAuthorInput1").val(),
         numPages: $("#bookNumPageInput1").val(),
         pubDate: $("#bookPubDateInput1").val(),
         cover: $("#bookUrlInput1").val()
      }
    }).done($.proxy(this._refreshDataSuccess, this)
  ).fail(function(){
    console.log("fail")
  });
};

// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "http://localhost:3000/library",
//   "method": "POST",
//   "headers": {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Cache-Control": "no-cache",
//     "Postman-Token": "2f7a6068-231c-4cce-b875-1aa977caf7e0"
//   },
//   "data": {

// title: $("#bookTitleInput1").val(),
// author: $("#bookAuthorInput1").val(),
// numPages: $("#bookNumPageInput1").val(),
// pubDate: $("#bookPubDateInput1").val(),
// cover: $("#bookUrlInput1").val()
//   }
// }

library.prototype._refreshDataSuccess = function(response) {
  if (response){
    $("tbody").children().remove();
      for(var i = 0; i <response.length; i++ ) {
        this.allBooks.push(response[i]);
    } }  else {
        return false;}
      this.renderTable();
  };
        
library.prototype.setLib = function() {
  // localStorage.setItem(this.stoKey, JSON.stringify(this.allBooks));
};
library.prototype.clrLocStoLib = function() {
  localStorage.removeItem(this.stoKey);
};
library.prototype.getLocStoLib = function() {

};

var Book = function (title, author, numPages, pubDate, cover){
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.pubDate = new Date(pubDate).toString().slice(0,15);
  this.cover = cover;
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
//
// removeBookByTitle(title)
// Purpose: Remove book from from the books array by its title.
// Return: boolean true if the book(s) were removed, false if no books match

library.prototype.removeBookByTitle = function (title) {
  for (var i=0; i<this.allBooks.length; i++) {
      if (this.allBooks[i].title === title) {
        this.deleteBookByTitle(i);
        this.allBooks.splice(i, 1);
        return true;
      }
    }
    return false;
};

library.prototype.deleteBookByTitle = function (title) {

// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "http://localhost:3000/library",
//   "method": "DELETE",
//   "headers": {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Cache-Control": "no-cache",
//   },
//   "data": {
//     _id: this.allBooks[i]._id
//   }
// }
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });
};

// removeBookByAuthor(authorName)
// Purpose: Remove a specific book from your books array by the author name.
// Return: boolean true if the book(s) were removed, false if no books match
library.prototype.removeBookByAuthor = function (author) {
  var b = 0;
  for (var i= this.allBooks.length - 1; i > -1; --i) {
      if (this.allBooks[i].author === author) {
        this.allBooks.splice(i, 1);
        b++;
      }

    }
    this.renderTable();

    if (b > 0) {
      return true;
    }else{
      
    }
    this.renderTable();
    return false;
};


// getRandomBook()
// Purpose: Return a random book object from your books array
// Return: book object if you find a book, null if there are no books
library.prototype.randomEvent = function () {
  if (this.getRandomBook()) {

  };

  $("#searchInput" ).addClass( "d-none" );
  if (selectFunction.selectIndex !== 0) {
    selectFunction.selectIndex = "0"
    }
};

library.prototype.getRandomBook = function () {
  if (this.allBooks.length == 0) {
    $("#showRecInfo").text("no books available due to loss of funding");
    return false;
  };
  var randomNumberBetween0andlen = Math.floor(Math.random() * this.allBooks.length);
  $("#showRecInfo").css( "font-style", "italic");
  var randomTitle = "title: " + this.allBooks[randomNumberBetween0andlen].title +
                                                        "  author: " + this.allBooks[randomNumberBetween0andlen].author;
  $("#showRecInfo").text(randomTitle);
  var tempSrcUrl = this.allBooks[randomNumberBetween0andlen].cover;
  $(".card-img-top").attr("src", this.allBooks[randomNumberBetween0andlen].cover);

  $("#selectFunction").val("0");
  return this.allBooks[randomNumberBetween0andlen];
};

// getBookByTitle(title)
// Purpose: Return all books that completely or partially matches the string title
// passed into the function
// Return: array of book objects if you find books with matching titles, empty array if
// no books are found

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

    // getBooksByAuthor(authorName)
    // Purpose: Finds all books where the author’s name partially or completely matches
    // the authorName argument passed to the function.
    // Return: array of books if you find books with match authors, empty array if no
    // books match
    // display to console command = console.table(lib.getBooksByAuthor("Herman Melville"));

    library.prototype.getBooksByAuthor = function (author) {
      var authorsBooks = [];
      for (var i=0; i < this.allBooks.length; i++) {
          // if (this.allBooks[i].author === author) {
          //   authorsBooks[i] = this.allBooks[i];
          // }
          if (this.allBooks[i].author.indexOf(author)  !==-1) {
            // authorsBooks[i] = this.allBooks[i];
             authorsBooks.push(this.allBooks[i]);
          };

        };
        return authorsBooks;
    };

    // getAuthors()
    // Purpose: Find the distinct authors’ names from all books in your library
    // Return: array of strings the names

    library.prototype.getAuthors = function () {
      var authors = [];
      $("#ulAuthors").children().remove();
      for (var i=0; i<this.allBooks.length; i++) {
        if (authors.indexOf(this.allBooks[i].author) ===-1) {
            // authors[iu] = (this.allBooks[i].author);
            authors.push(this.allBooks[i].author);
          }
        };
        for (var i=0; i<authors.length; i++) {
          $("#ulAuthors").append("<li class='font-weight-bold authorLi'>"+ authors[i] + "</li>");
        };
        $("#modalLabel").text("Authors");
        $("#exampleModal").modal({show: true});
      return authors;
  };


//   getRandomAuthorName()
// Purpose: Retrieves a random author name from your books collection
// Return: string author name, null if no books exist

library.prototype.getRandomAuthorName = function () {
  if (this.allBooks.length == 0) {
    return null;
  }
  return this.allBooks[Math.floor(Math.random() * this.allBooks.length)].author;
};

// Add a more robust search function to your app to allow you to filter by one or more book
// properties
// ○ the search function should return an array of book instances
library.prototype.getBookByAuthTitle = function (title, author) {
  var titleBooks = [];
  for (var i=0; i<this.allBooks.length; i++)
    {
      // if (this.allBooks[i].title === title ||
      if ((this.allBooks[i].author.indexOf(author)  !==-1) ||
        (this.allBooks[i].title.indexOf(title)  !==-1)) {
        // return this.allBooks[i];
        // titleBooks[i] = this.allBooks[i];
        titleBooks.push(this.allBooks[i]);


      }
    }
    return titleBooks;

};
//function for main search input
library.prototype.searchInputText = function () {
  var MysearchInput = this.$mySearchInput.val();
  var MySearchLabel = this.$mySearchLabel.text();
  this.evalSearchVal();
  this.initInput();
};
library.prototype.initInput = function () {
  $("#textInput").val("");
  $("#selectLabel").text("");
  // $("#compMsg" ).addClass( "d-none" );
}
library.prototype.choiceSelect = function (myValue) {
  var myValue = $("#selectFunction").val();
  $("#compMsg" ).addClass( "d-none" );
  // if (myValue !== "1") {
  //   $("#inputTitleData" ).addClass( "d-none" );
  // }

  switch (myValue) {
    case "0":
        $("#compMsg").val("no selection made");
        $("#compMsg" ).removeClass( "d-none" );
        break;
    case "1":     //add a book
        $("#inputTitleData" ).removeClass( "d-none" );
        $("#searchInput" ).addClass( "d-none" );
        $("#selectLabel").text("")
        break;
    case "2":    //remove book by exact match , maybe preditive search
        $("#inputTitleData" ).addClass( "d-none" );
        $("#searchInput" ).removeClass( "d-none" );
        $("#textInput" ).show();
        // document.getElementById("results").innerHTML = "please enter title to remove";
        $("#selectLabel").text("enter title");
        break;
    case "3":    //book recommendation same as random book and display
        this.getRandomBook();
        // document.getElementById("results").innerHTML = "";
        // document.getElementById("selectFunction").innerHTML = "0";
        $("#searchInput" ).addClass( "d-none" );
        break;
    case "4":    //get book by title
        $("#searchInput" ).removeClass( "d-none" );
        // $("#searchInput" ).show();
        // document.getElementById("results").innerHTML = "please enter title";
        $("#selectLabel").text("enter book title");
        $("#textInput" ).show();
        break;
    case "5":    //get book by author
        $("#searchInput" ).removeClass("d-none");
        $("#selectLabel").text("enter authors full or partial name");
        $("#textInput" ).show();
        break;
    case "6":    //get authors list
        $("#searchInput" ).addClass( "d-none" );
        this.getAuthors();
        // $("#myAuthors").text(myAuthorsRet);
        // $("#myAuthors").modal({show: true});
          $("#selectFunction").val("0");
        break;
    case "7":    //get random author's books
        $("#searchInput" ).addClass( "d-none" );
        break;
    case "8":    //remove book by exact author , maybe preditive search
        $("#inputTitleData" ).addClass( "d-none" );
        $("#searchInput" ).removeClass( "d-none" );
        $("#textInput" ).show();
        $("#selectLabel").text("enter full author to be removed");
        break;
    default:
        break;
      };
  };

  library.prototype.evalSearchVal = function () {
  switch (this.$mySearchLabel.text()) {
    case "enter book title": //label for title search
      if (this.getBookByTitle(this.$mySearchInput.val())) {
        break
      } else {
        break
      };
      return true;   //case "4":    //get book by title
      case "enter title": //label for title to remove  case "2"
      this.removeByTitle(this.$mySearchInput.val());
      return true;
    case "enter authors full or partial name": //label for title search by author
      this.searchByAuthor(this.$mySearchInput.val());
      return true;
    case "enter full author to be removed": //label for title search by author
      this.removeAllAuthBooks(this.$mySearchInput.val());
      break;
    default:
    console.log("nothing found in evalsearch");
      return false;
  };
};

library.prototype.removeByTitle = function () {
    if (this.removeBookByTitle(this.$mySearchInput.val())) {
      $("#searchInput" ).addClass( "d-none" );
      document.getElementById("selectFunction").value="0";
      $("#compMsg").removeClass("d-none");
      $("#compMsg").text( "Title " + this.$mySearchInput.val() + " removed");
      this.renderTable();
      this.setLib();
      // document.getElementById("compMsg").innerHTML = "";
    }    else {
      $("#compMsg").text("not found");
      $("#compMsg" ).removeClass( "d-none" );
      $("#selectLabel").text("enter title");
    }
    // target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    return true;

};
  library.prototype.searchByAuthor = function () {
    var titleResults = this.getBooksByAuthor(this.$mySearchInput.val());
    // if (this.getBooksByAuthor(this.$mySearchInput.val())) {
      $("#textInput").val();
      $("#selectFunction").val("0");
      $("#searchInput" ).addClass( "d-none" );
      $("tbody").children().remove();
      if ((titleResults).length > 0) {
        for(var i=0; i < titleResults.length; i++){
          this.renderRow(i, titleResults[i]);
        };
      } else {
        alert("you are kinda fucked");
        return false;
      };

    return true;
  };

  library.prototype.removeAllAuthBooks = function () {
    var titleResults = this.removeBookByAuthor(this.$mySearchInput.val());
    document.getElementById("results").innerHTML = "";
    document.getElementById("textInput").value="";
    document.getElementById("selectFunction").value="0";
    $("#searchInput" ).addClass( "d-none" );
    $("#compMsg" ).removeClass( "d-none" );
    this.renderTable();
    this.setLib();
    // target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    return;
  };


  library.prototype.addABook = function () {
    var myTitle = $("#bookTitleInput1").val();
    var myAuth = $("#bookAuthorInput1").val();
    var myPages = $("#bookNumPageInput1").val();
    var myDate = $("#bookPubDateInput1").val();
    var myBookImage = $("#bookUrlInput1").val();
    var newTitle = new Book(myTitle, myAuth, myPages ,  myDate, myBookImage);
    this.postApiData(newTitle);
    $("#compMsg").addClass("d-none");
    $("#compMsg").val("");

    if (this.addBook(newTitle)  ) {
      //check is true, execute this code
      $("#bookTitleInput1").val("");
      $("#bookAuthorInput1").val("");
      $("#bookNumPageInput1").val("");
      $("#bookPubDateInput1").val("");
      $("#bookUrlInput1").val("");

      // below will display new title in list
      // this.renderTable();
      $("#textInput").val("");
      $("#selectFunction").val("0");
      $("#inputTitleData" ).addClass( "d-none" );
    }
    else {
      $("#compMsg").removeClass("d-none");
      $("#compMsg").text("title already in library");
    }
};
