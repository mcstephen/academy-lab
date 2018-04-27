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
  // $(".show-auths").on("click", $.proxy(this.showauthors, this));
  $("#runButton").on("click", $.proxy(this.searchInputText, this));
  $("#addButton").on("click", $.proxy(this.addABook, this));
  $("#selectFunction").on("change", $.proxy(this.choiceSelect, this));
  $("#randomBtn").on("click", $.proxy(this.getRandomBook, this));
  $("#modalBtn").on("click", $.proxy(this.getAuthors, this));

};

library.prototype._handleMyEvent = function(e){
  var $tr = $(e.currentTarget).parent("tr");
  this.allBooks.splice($tr.attr("data-id"), 1);
  $tr.remove();
  this.setLib();
};

library.prototype.renderTable = function(){
  $("tbody").children().remove();
  for(var i=0; i < this.allBooks.length; i++){
    this.renderRow(i, this.allBooks[i]);
  }
};

library.prototype.renderRow = function(index, book){
  $("table tbody").append("<tr data-id='"+index+"'><th scope='row'>"+index+"</th><td>"+book.title+"</td><td class='auth'>"+book.author+"</td><td>"+book.numPages+"</td><td class='delete'>x</td></tr>");
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
    $(".table").DataTable();
    this.renderTable();
    this.getRandomBook();
  };

$( document ).ready (function() { //Doc ready
  window.gLib = new library("gLib");
  window.gLib.myInitializationMethod();
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
    tempLocalSto[i].pubDate
  ));
};
};

var Book = function (title, author, numPages, pubDate){
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.pubDate = new Date(pubDate).toString().slice(0,15);
}

var gWap = new Book("War and Peace", "Leo Tolstoy", 1296, "01/01/1869");
var gTheBible = new Book("The Bible", "Various authors", 1200, "January 1, 2001");
var gCatcher = new Book("Catcher in the Rye", "JD Salenger", 240, "January 2001");
var gGatsby = new Book("The Great Gatsby", "F. Scott Fitzgerald", 256, "January 2001");
var gHuck = new Book("The Adventures of Huckleberry Finn", "Mark Twain", 366, "December 10, 1884");
var gHam = new Book("Hamlet", "Bill shakespeare", 1200, "January 1599");
var gMoby = new Book("Moby Dick", "Herman Melville", 378, "October 18, 1851");
var gMoby1 = new Book("Moby Dick1", "Herman Melville", 378, "October 18, 1851");
var gMoby2 = new Book("Moby Dick2", "Herman Melville", 378, "October 18, 1951");
var gMoby3 = new Book("Moby Dick3", "Herman Melville", 378, "October 18, 1851");
var gNotMoby = new Book("Not Moby Dick", "Herman Munster", 378, "October 18, 1851");
var gNotMoby2 = new Book("Not Moby Dick4", "Herman Munster", 378, "October 18, 1951");
var gHitch = new Book("Hitchhiker's Guide to the Galaxy", "Douglas Adams", 224, "September 27, 1985");
var g1984 = new Book("1984", "George Orwell", 224, "September 27, 1985");

//function to load all books for testing only
library.prototype.addAllBooks = function () {
  gLib.addBook(gMoby1);
  gLib.addBook(gMoby2);
  gLib.addBook(gMoby3);
  gLib.addBook(gNotMoby);
  gLib.addBook(gNotMoby2);
  gLib.addBook(gWap);
  gLib.addBook(gTheBible);
  gLib.addBook(gCatcher);
  gLib.addBook(gGatsby);
  gLib.addBook(gHuck);
  gLib.addBook(gHam);
  gLib.addBook(gMoby);
  gLib.addBook(gHitch);
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
//
// removeBookByTitle(title)
// Purpose: Remove book from from the books array by its title.
// Return: boolean true if the book(s) were removed, false if no books match

library.prototype.removeBookByTitle = function (title) {
  for (var i=0; i<this.allBooks.length; i++) {
      if (this.allBooks[i].title === title) {
        this.allBooks.splice(i, 1);
        return true;
      }
    }
    return false;
}

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
    if (b > 0) {
      this.renderTable();
      return true;
    }
    this.renderTable();
    return false;
}


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
    return false;
  };
  var randomNumberBetween0andlen = Math.floor(Math.random() * this.allBooks.length);
  $("#showRecInfo").css( "font-style", "italic");
  document.getElementById("showRecInfo").innerHTML = "title: " + this.allBooks[randomNumberBetween0andlen].title +
                                                          "  author: " + this.allBooks[randomNumberBetween0andlen].author;

  selectFunction.selectIndex = "0"
  return this.allBooks[randomNumberBetween0andlen];
};

// getBookByTitle(title)
// Purpose: Return all books that completely or partially matches the string title
// passed into the function
// Return: array of book objects if you find books with matching titles, empty array if
// no books are found

library.prototype.getBookByTitle = function (title) {
  var titleBooks = [];
  for (var i=0; i<this.allBooks.length; i++)
    {

      if (this.allBooks[i].title.indexOf(title)  !==-1) {
        // this.allBooks[i].push(titleBooks);
        titleBooks.push(this.allBooks[i]);

      }
    }
    return titleBooks;
}


    // getBooksByAuthor(authorName)
    // Purpose: Finds all books where the author’s name partially or completely matches
    // the authorName argument passed to the function.
    // Return: array of books if you find books with match authors, empty array if no
    // books match
    // display to console command = console.table(lib.getBooksByAuthor("Herman Melville"));

    library.prototype.getBooksByAuthor = function (author) {
      var authorsBooks = [];
      for (var i= this.allBooks.length - 1; i > -1; --i) {
          if (this.allBooks[i].author === author) {
            authorsBooks[i] = this.allBooks[i];
          }
          if (this.allBooks[i].author.indexOf(author)  !==-1) {
            // authorsBooks[i] = this.allBooks[i];
             authorsBooks.push(this.allBooks[i]);
          }

        }
        return authorsBooks;
    }

    // getAuthors()
    // Purpose: Find the distinct authors’ names from all books in your library
    // Return: array of strings the names

    library.prototype.getAuthors = function () {
      authors = [];
      for (var i=0; i<this.allBooks.length; i++) {
        if (authors.indexOf(this.allBooks[i].author) ===-1) {
            // authors[iu] = (this.allBooks[i].author);
            authors.push(this.allBooks[i].author);
          }
        }
        $("#myAuthors").text(authors);
        $("#myAuthors").modal({show: true});
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
}

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

}
//function for main search input
library.prototype.searchInputText = function () {
  var mySearchValue = $("#textInput").val();
  var mySearchLabel = $("#selectLabel").text();
  $("#textInput").val("");
  $("#selectLabel").text("");
  $("#compMsg" ).addClass( "d-none" );
    switch (mySearchLabel) {
  case "enter book title": //label for title search
    var titleResults = this.getBookByTitle(mySearchValue);
    $("#searchInput" ).addClass( "d-none" );
    document.getElementById("textInput").value="";
    document.getElementById("selectFunction").value="0";
    $("tbody").children().remove();
    for(var i=0; i < titleResults.length; i++){
      this.renderRow(i, titleResults[i]);
    };
    break;
  case "enter title": //label for title to remove
    if (this.removeBookByTitle(mySearchValue)) {
      $("#searchInput" ).addClass( "d-none" );
      // document.getElementById("results").innerHTML = "Title " + mySearchValue + " removed";
      document.getElementById("textInput").value="";
      document.getElementById("selectFunction").value="0";
      $("#compMsg").removeClass("d-none");
      $("#compMsg").text( "Title " + mySearchValue + " removed");
      this.renderTable();
      this.setLib();
      // document.getElementById("compMsg").innerHTML = "";
    }    else {
      $("#compMsg").text("not found");
      $("#compMsg" ).removeClass( "d-none" );
      $("#selectLabel").text("enter title");
    }
    // target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    break;
  case "enter authors full or partial name": //label for title search by author
    var titleResults = this.getBooksByAuthor(mySearchValue);
    // if (this.getBooksByAuthor(mySearchValue)) {
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
      };

    break;
  case "enter full author to be removed": //label for title search by author
    var titleResults = this.removeBookByAuthor(mySearchValue);
    document.getElementById("results").innerHTML = "";
    document.getElementById("textInput").value="";
    document.getElementById("selectFunction").value="0";
    $("#searchInput" ).addClass( "d-none" );
    $("#compMsg" ).removeClass( "d-none" );
    this.renderTable();
    this.setLib();
    // target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    break;

  default:
        document.getElementById("results").innerHTML = "please make a selection";
        break;
      };
  };

library.prototype.choiceSelect = function (myValue) {
  var myValue = document.getElementById("selectFunction").value;
  $("#compMsg" ).addClass( "d-none" );
  if (myValue !== "1") {
    $("#inputTitleData" ).addClass( "d-none" );
  }

  switch (myValue) {
    case "0":
        document.getElementById("results").innerHTML = "no selection made";
        break;
    case "1":     //add a book
        console.log($("#inputTitleData").class);
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
        var myAuthorsRet =  this.getAuthors();
        $("#myAuthors").text(myAuthorsRet);
        $("#myAuthors").modal({show: true});
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
        document.getElementById("results").innerHTML = "please make a selection";
      };
  };

  library.prototype.addABook = function () {
    var myTitle = $("#bookTitleInput1").val();
    var myAuth = $("#bookAuthorInput1").val();
    var myPages = $("#bookNumPageInput1").val();
    var myDate = $("#bookPubDateInput1").val();
    var newTitle = new Book(myTitle, myAuth, myPages ,  myDate);
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

library.prototype.display_array = function () {
    //  for future use
};
