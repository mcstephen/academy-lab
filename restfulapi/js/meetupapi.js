
(function() {  //self invocking function (anon self invoke function)
    var api_instance; //define somewhere for our instances

    window.api = function() {  //replaces library constructor
      // return the instance if we already have one
      if (api_instance) {
        return api_instance;
      }
      api_instance = this; //after instance is created assign it ti our instance
    }
})();

$function () {

    bindMyEvents = function() {
        $("#button1").on("click", $.proxy(this._handleMyEvent, this)); //delegation
}
};

// class meetupResults {
//     constructor(state, city, numResults) {
//         this.name = meetupResults;
//         this.state = state;
//         this.city = city;
//         this.numResults = numResults;
//     }
// };
// function _handleMyEvent = function(e){
//     var $tr = $(e.currentTarget).parent("tr");
//     this.allBooks.splice($tr.attr("data-id"), 1);
//     $tr.remove();
//     this.setLib();
//     this.renderTable();
//   };

//   function myInitializationMethod = function () {
//     //Anything I want kicked off on doc ready which is specific to my instance
//     $( "label" ).css( "font-style", "italic" );
//     $( "placeholder" ).css( "font-style", "italic");
//     $( "placeholder" ).css("opacity, 0.5");
//     this._bindMyEvents();
//   };


api.prototype.getMeetup = function() {

    $.ajax({
        dataType: 'jsonp',
        type:"GET",
        url:"https://api.meetup.com/2/cities",
        data: {
          // key: "6e3d5d1a5632351a3e4a274c3f66910"
            state: $("#inputState").val(),
            country: $("#inputCountry").val(),
            page: $("#page").val()
        }
      }).done(function(this.meetResults){
        console.log("yeah!!!")
        var myResults = (this.meetResults)
      }).fail(function(){
        console.log("fail")
      })
    })
  });