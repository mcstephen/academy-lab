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

// library.prototype.initialize = function () {
//   // kick off functions
// }
//
// library.prototype._bindEvents = function () {
//
// };

  library.prototype.myInitializationMethod = function () {
    //Anything I want kicked off on doc ready which is specific to my instance
    $( "label" ).css( "font-style", "italic" );
    $( "placeholder" ).css( "font-style", "italic");
    $( "placeholder" ).css("opacity, 0.5");
    $("#btn0").show();
    $("#myTable").tablesorter();
    this._bindMyEvents();
  };
  library.prototype._bindMyEvents = function () {
    $("#runButton").on( "click", function(event) {
      alert("bind my events");
      // this.searchInputText();
    });
    $("#selectFunction").on( "onchange", function() {
      this.choiceSelect();
});
    //Bind all my event handlers here
  };
$(function(){ //Doc ready
  window.gLib = new library("gLib");
  gLib.myInitializationMethod();


  // window.gLib.initialize();
});
// var gLib = new library("libKey");
// var gLibx = new library("libKeyx");


library.prototype.setLib = function() {
  localStorage.setItem(this.stoKey, JSON.stringify(this.allBooks));
}
library.prototype.clrLocStoLib = function() {
  localStorage.removeItem(this.stoKey);
}
library.prototype.getLocStoLib = function() {
  this.allBooks = JSON.parse(localStorage.getItem(this.stoKey));
}
// localstorage.setitem("library", lib);

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
  // this.allBooks.toString();
// document.getElementById("results").innerHTML = this.allBooks;

  return true
}

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
}
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
      return true;
    }
    return false;
}


// getRandomBook()
// Purpose: Return a random book object from your books array
// Return: book object if you find a book, null if there are no books

library.prototype.getRandomBook = function () {
  if (this.allBooks.length == 0) {
    return null;
  }
  var randomNumberBetween0andlen = Math.floor(Math.random() * this.allBooks.length);
  document.getElementById("showRecInfo").innerHTML = this.allBooks[randomNumberBetween0andlen];
  return this.allBooks[randomNumberBetween0andlen];
}

// getBookByTitle(title)
// Purpose: Return all books that completely or partially matches the string title
// passed into the function
// Return: array of book objects if you find books with matching titles, empty array if
// no books are found

library.prototype.getBookByTitle = function (title) {
  var titleBooks = [];
  for (var i=0; i<this.allBooks.length; i++)
    {
      // if (this.allBooks[i].title === title){
      //   return this.allBooks[i];
      // }
      if (this.allBooks[i].title.indexOf(title)  !==-1) {
        // this.allBooks[i].push(titleBooks);
        titleBooks.push(this.allBooks[i]);

        // titleBooks[i] = this.allBooks[i];
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
 // (var i=0; i<this.allBooks.length; i++)
    library.prototype.getAuthors = function () {
      authors = [];
      var iu = 1;
      for (var i=0; i<this.allBooks.length; i++) {
        if (authors.indexOf(this.allBooks[i].author) ===-1) {
            // authors[iu] = (this.allBooks[i].author);
            authors.push(this.allBooks[i].author);

            iu++;
          }
        }
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
  var mySearchValue = document.getElementById("textInput").value;
  var mySearchLabel = document.getElementById("selectLabel").innerText;
    switch (mySearchLabel) {
  case "enter full book title": //label for title search
    var titleResults = this.getBookByTitle(mySearchValue);
    $("#searchInput" ).addClass( "d-none" );
    document.getElementById("results").innerHTML = "please make a selection";
    document.getElementById("textInput").value="";
    document.getElementById("selectFunction").value="0";
    target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    break;
  case "enter full book title to be removed": //label for title search
    if (this.removeBookByTitle(mySearchValue)) {
      $("#searchInput" ).addClass( "d-none" );
      document.getElementById("results").innerHTML = "Title " + mySearchValue + " removed";
      document.getElementById("textInput").value="";
      document.getElementById("selectFunction").value="0";
      this.setLib();
      break;
    };
    target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    break;
  case "enter authors full name": //label for title search by author
    var titleResults = this.getBooksByAuthor(mySearchValue);
    document.getElementById("results").innerHTML = "";
    document.getElementById("textInput").value="";
    document.getElementById("selectFunction").value="0";
    $("#searchInput" ).addClass( "d-none" );
    target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    break;
  case "enter full author to be removed": //label for title search by author
    var titleResults = this.removeBookByAuthor(mySearchValue);
    document.getElementById("results").innerHTML = "";
    document.getElementById("textInput").value="";
    document.getElementById("selectFunction").value="0";
    $("#searchInput" ).addClass( "d-none" );
    this.setLib();
    target.innerHTML = '<li>' + titleResults.join('</li><li>') + '</li>';
    break;

  default:
        document.getElementById("results").innerHTML = "please make a selection";
        break;
      };
  };

library.prototype.choiceSelect = function (myValue) {
  var myValue = document.getElementById("selectFunction").value;
  console.log("selector value =: " + myValue);
  switch (myValue) {
    case "0":
        document.getElementById("results").innerHTML = "no selection made";
        break;
    case "1":
        $("#inputTitleData" ).removeClass( "d-none" );
        $("#searchInput" ).addClass( "d-none" );

        $("#selectLabel").text("")
        break;
    case "2":    //remove book by exact match , maybe preditive search
        $("#inputTitleData" ).addClass( "d-none" );
        $("#searchInput" ).removeClass( "d-none" );
        $("#textInput" ).show();
        document.getElementById("results").innerHTML = "please enter title to remove";
        $("#selectLabel").text("enter full book title to be removed");
        break;
    case "3":    //book recommendation same as random book and display
        document.getElementById("results").innerHTML = "";
        $("#searchInput" ).addClass( "d-none" );
        break;
    case "4":    //get book by title
        $("#searchInput" ).removeClass( "d-none" );
        // $("#searchInput" ).show();
        document.getElementById("results").innerHTML = "please enter title";
        $("#selectLabel").text("enter full book title");
        $("#textInput" ).show();
        break;
    case "5":    //get book by author
        $("#searchInput" ).removeClass("d-none");
        document.getElementById("results").innerHTML = "please make a selection";
        $("#selectLabel").text("enter authors full name");
        $("#textInput" ).show();
        break;
    case "6":    //get authors list
        $("#searchInput" ).addClass( "d-none" );
        var myAuthorsRet =  this.getAuthors();
        target.innerHTML = '<li>' + myAuthorsRet.join('</li><li>') + '</li>';
        console.log("authors from get authors: " + myAuthorsRet);
        // document.getElementById("results").innerHTML = "no other input required";
        break;
    case "7":    //get random author's books
        document.getElementById("results").innerHTML = "no other input required";
        break;
        case "8":    //remove book by exact author , maybe preditive search
            $("#inputTitleData" ).addClass( "d-none" );
            $("#searchInput" ).removeClass( "d-none" );
            $("#textInput" ).show();
            document.getElementById("results").innerHTML = "please enter Author to remove";
            $("#selectLabel").text("enter full author to be removed");
            break;
    default:
        document.getElementById("results").innerHTML = "please make a selection";
      };
  // if (myValue == "1") {
  //   console.log("vaue of select is: " + myValue);
  //   // $("#inputTitleData").show();
  // }
  //   else {
  //     $("#inputTitleData").addClass("d-none");
  //   };

  };

  library.prototype.addABook = function () {
    var myTitle = document.getElementById("bookTitleInput1").value;
    var myAuth = document.getElementById("bookAuthorInput1").value;
    var myPages = document.getElementById("bookNumPageInput1").value;
    var myDate = document.getElementById("bookPubDateInput1").value;
    var newTitle = new Book(myTitle, myAuth, myPages ,  myDate);
// when
    if (this.addBook(newTitle)  )
        //check is true, execute this code
        console.log("returned true not a dupe: " + newTitle);
        this.setLib();
        document.getElementById("bookTitleInput1").value = '';
        document.getElementById("bookAuthorInput1").value = '';
        document.getElementById("bookNumPageInput1").value = '';
        document.getElementById("bookPubDateInput1").value = '';
        // below will display new title in list
        this.allBooks.toString();
    document.getElementById("results").innerHTML = this.allBooks;
};
document.getElementById("results").innerHTML = this.allBooks;

//bind events
// library.prototype.bindEvents = function () {
//   $(#html-element-id).on("click", $proxy(this.function1, this))
// }



library.prototype.display_array = function () {

}
