
var Library = function (stoKey) {
  this.allBooks = [];
  this.stoKey = stoKey;

};
var lib = new Library("libKey");
var libx = new Library("libKeyx");


Library.prototype.setLib = function() {
  localStorage.setItem(this.stoKey, JSON.stringify(this.allBooks));
}
Library.prototype.clrLocStoLib = function() {
  localStorage.removeItem(this.stoKey);
}
Library.prototype.getLocStoLib = function() {
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

Library.prototype.addAllBooks = function () {
  lib.addBook(gMoby1);
  lib.addBook(gMoby2);
  lib.addBook(gMoby3);
  lib.addBook(gNotMoby);
  lib.addBook(gNotMoby2);
  lib.addBook(gWap);
  lib.addBook(gTheBible);
  lib.addBook(gCatcher);
  lib.addBook(gGatsby);
  lib.addBook(gHuck);
  lib.addBook(gHam);
  lib.addBook(gMoby);
}

// addBook(book)
// Purpose: Add a book object to your books array.
// Return: boolean true if it is not already added, false if it is already added.

Library.prototype.addBook = function (newBook) {
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

Library.prototype.removeBookByTitle = function (title) {
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
Library.prototype.removeBookByAuthor = function (author) {
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

Library.prototype.getRandomBook = function () {
  if (this.allBooks.length == 0) {
    return null;
  }
  var randomNumberBetween0andlen = Math.floor(Math.random() * this.allBooks.length);
  return this.allBooks[randomNumberBetween0andlen];
}

// getBookByTitle(title)
// Purpose: Return all books that completely or partially matches the string title
// passed into the function
// Return: array of book objects if you find books with matching titles, empty array if
// no books are found

Library.prototype.getBookByTitle = function (title) {
  var titleBooks = [];
  for (var i=0; i<this.allBooks.length; i++)
    {
      if (this.allBooks[i].title === title){
        return this.allBooks[i];
      }
      if (this.allBooks[i].title.indexOf(title)  !==-1) {
        titleBooks[i] = this.allBooks[i];
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

    Library.prototype.getBooksByAuthor = function (author) {
      var authorsBooks = [];
      for (var i= this.allBooks.length - 1; i > -1; --i) {
          if (this.allBooks[i].author === author) {
            authorsBooks[i] = this.allBooks[i];
          }
          if (this.allBooks[i].author.indexOf(author)  !==-1) {
            authorsBooks[i] = this.allBooks[i];
          }

        }
        return authorsBooks;
    }

    // getAuthors()
    // Purpose: Find the distinct authors’ names from all books in your library
    // Return: array of strings the names
 // (var i=0; i<this.allBooks.length; i++)
    Library.prototype.getAuthors = function () {
      authors = [];
      var iu = 1;
      for (var i=0; i<this.allBooks.length; i++) {
        if (authors.indexOf(this.allBooks[i].author) <0) {
            authors[iu] = (this.allBooks[i].author);
            iu++;
          }
        }
      return authors;
  };

//   getRandomAuthorName()
// Purpose: Retrieves a random author name from your books collection
// Return: string author name, null if no books exist

Library.prototype.getRandomAuthorName = function () {
  if (this.allBooks.length == 0) {
    return null;
  }
  return this.allBooks[Math.floor(Math.random() * this.allBooks.length)].author;
}

// Add a more robust search function to your app to allow you to filter by one or more book
// properties
// ○ the search function should return an array of book instances
Library.prototype.getBookByAuthTitle = function (title, author) {
  var titleBooks = [];
  for (var i=0; i<this.allBooks.length; i++)
    {
      // if (this.allBooks[i].title === title ||
      if ((this.allBooks[i].author.indexOf(author)  !==-1) ||
        (this.allBooks[i].title.indexOf(title)  !==-1)) {
        // return this.allBooks[i];
        titleBooks[i] = this.allBooks[i];

      }
    }
    return titleBooks;
}
SingInst = (function() {
  var instance;

  function create() {
  //properties
  //methods
  function add(interval,times,callback,name){

  }
  return {add:add};
}
return {getInstance:function(){
  if(!instance) instance = create();
}}
