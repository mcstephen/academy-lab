(function() {  //self invocking function (anon self invoke function)
    var MeetApi_instance; //define somewhere for our instances

    window.MeetApi = function() {  //replaces library constructor
      // return the instance if we already have one
      if (MeetApi_instance) {
        return MeetApi_instance;
      }
      MeetApi_instance = this; //after instance is created assign it ti our instance
    };
})();

$( document ).ready (function() { //Doc ready
    window.gApi = new MeetApi("gApi");
    window.gApi.init();

  });
  var MeetApi = function (stoKey) {
    this.allMeet = [];
    this.stoKey = stoKey;
    };
MeetApi.prototype.init = function() {
    this.bindEvents();
    this._initVars();
    this.refreshDataUrl = 'https://api.meetup.com/2/cities';
    // this.$container = $(el);


    // this.getLocStoLib();
    };

MeetApi.prototype._initVars = function() {
    this.$myCountry = $("#inputCountry");
    this.$myState = $("#inputState");
    this.$myPages = $("#inputNumResults");
  };
    
MeetApi.prototype.bindEvents = function() {
    $("#button1").on("click", $.proxy(this.refreshData, this));
// this.$container.on("click", ".refresh", $.proxy(this.refreshData,
// this));
};

var meetCity = function (zip, country, city, ranking, mbrCount, lon, lat){
    this.zip = zip;
    this.country = country;
    this.city = city;
    this.ranking = ranking;
    this.mbrCount = mbrCount;
    this.lon = lon;
    this.lat = lat;
  };
//   MeetApi.prototype.addArray = function (newRow) {
//     for (var i=0; i<this.allMeet.length; i++) {
//         this.allMeet.push(newRow);
//         return true;
//       }
 
//   };
MeetApi.prototype.setLib = function() {
    localStorage.setItem(this.stoKey, JSON.stringify(this.allMeet));
  };
  MeetApi.prototype.clrLocStoLib = function() {
    localStorage.removeItem(this.stoKey);
  }
  MeetApi.prototype.getLocStoLib = function() {
    var tempLocalSto = JSON.parse(localStorage.getItem(this.stoKey)) || [];
    for (var i=0; i<tempLocalSto.length; i++) {
    this.addRow(new meetCity(
      tempLocalSto[i].zip,
      tempLocalSto[i].country,
      tempLocalSto[i].city,
      tempLocalSto[i].ranking,
      tempLocalSto[i].state,
      tempLocalSto[i].member_count,
      tempLocalSto[i].lon,
      tempLocalSto[i].lat
    ));
  };
  };
  MeetApi.prototype.addRow = function (meetCity, i) {
    this.allMeet.push(meetCity)[i];
    return;
  };


    MeetApi.prototype.refreshData = function() {
      console.log("refreshData = this.allmeet===>" + this.allMeet.length)

        this.getApiData();
        this.markerMap();

    };
MeetApi.prototype.getApiData = function() {
  console.log("getApiData = this.allmeet===>" + this.allMeet.length)

    event.preventDefault();
    // this.$myCountry = $("#inputCountry").val();
    // this.$myState = $("#inputState").val();
    // this.$myPages = $("#inputNumResults").val();
    $.ajax({
        dataType: 'jsonp',
        type:"GET",
        url:"https://api.meetup.com/2/cities",
        data: {
                key: "6e3d5d1a5632351a3e4a274c3f66910",
                country: this.$myCountry.val(),
                state: this.$myState.val(),
                page: this.$myPages.val() 
        }
      }).done($.proxy(this.refreshDataSuccess, this)
      ).fail(function(){
        console.log("fail")
      });
};

    MeetApi.prototype.refreshDataSuccess = function(response) {
      console.log("refreshDataSuccess  = this.allmeet===>" + this.allMeet.length)

        $("tbody").children().remove();
        this.allMeet = [];
        for(var i = 0; i <response.results.length; i++ ) {
            $("table tbody").append("<tr class='text-center'><td class='zip'>"+response.results[i].zip+"</td><td class='city'>"+response.results[i].localized_country_name+"</td><td class='city'>"+response.results[i].city+"</td><td class='ranking'>"+response.results[i].ranking+"</td><td class='state'>"+response.results[i].state+"</td><td class='mbr_count'>"+response.results[i].member_count+"</td></tr>");
            // console.log(response.results[i]);
            this.allMeet.push(response.results[i]);
        } 
        this.setLib();
        };

        // var map;
        function initMap() {
// below is a simple hard coded version of the google map
            var uluru = {lat: 40.04999923706055, lng: -105.20999908447266};
            var denver = {lat: 39.7392, lng: -104.9903};
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 7,
              center: uluru
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
            var marker2 = new google.maps.Marker({
                position: denver,
                map: map
              });
// end sample code

          };
          
MeetApi.prototype.markerMap = function() {
   console.log("markerMap = this.allmeet===>" + this.allMeet.length)
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(this.allMeet[0].lat, this.allMeet[0].lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
  
      var infowindow = new google.maps.InfoWindow();
  
      var marker, i;
  
      for (i = 0; i < this.allMeet.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.allMeet[i].lat, this.allMeet[i].lon),
          map: map
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(this.allMeet[i][0]);
            console.log("markerMap/setContent = this.allmeet===>" + this.allMeet.length)

            infowindow.open(map, marker);
          }
        })(marker, i));
      }
};

