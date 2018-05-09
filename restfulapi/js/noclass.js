
(function() {  //self invocking function (anon self invoke function)
    var MeetUp_instance; //define somewhere for our instances

    window.MeetUp = function() {  //replaces library constructor
      // return the instance if we already have one
      if (MeetUp_instance) {
        return MeetUp_instance;
      }
      MeetUp_instance = this; //after instance is created assign it ti our instance
    };
})();

$( document ).ready (function() { //Doc ready
  window.gApi = new MeetUp("gApi");
  window.gApi.myInitializationMethod();
});

gApi.prototype.myInitializationMethod = function () {
  //Anything I want kicked off on doc ready which is specific to my instance
  console.log("oh shit!!!");
  this._bindMyEvents();
};

gApi.prototype._bindMyEvents = function() {
        // $("#button1").on("click", $.proxy(this._handleMyEvent, this)); //delegation
        $("#button1").on("click", $.proxy(this.getMeet, this)); //delegation

};


gApi.prototype.allMeet = [];

var gApi = function(stoKey) {
  this.allMeet = [];
  this.stoKey = stoKey;
};

gApi.prototype.meetResults = function (state, city, numResults) {
        this.name = "results";
        this.state = state;
        this.city = city;
        this.numResults = numResults;
    };

gApi.prototype.renderTable = function(){
  $("tbody").children().remove();
  for(var i=0; i < this.allMeet.length; i++){
    $("table tbody").append("<tr><td class='city'>"+this.allMeet.city+"</td><td class='auth'>"+this.allMeet.state+"</td><td class='numPages'>"+this.allMeet.numPages+"</td></tr>");
  }
};

  gApi.prototype.addResult = function (newResult) {
    for (var i=0; i<this.newResults.length; i++) {
      if (this.newResult.type = 'results')
        this.allMeet.push(newBook);
      }
      return true;
  };

gApi.prototype.getMeet = function(){
  var myResultStore = this.allMeet;
    $.ajax({
        dataType: 'jsonp',
        type:"GET",
        url:"https://api.meetup.com/2/cities",
        data: {
          // key: "6e3d5d1a5632351a3e4a274c3f66910"
            state: $("#inputState").val(),
            country: $("#inputCountry").val(),
            page: $("#inputNumResults").val()
        }
      }).done(function(myResultStore){
        console.log("yeah!!!");
        var myResults = (this.myResultStore);
      }).fail(function(){
        console.log("fail");
      })
    };


