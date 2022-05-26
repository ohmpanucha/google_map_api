<template>
  <div class="mb-4">
    <div
      id="map"
      class="border border-secondary rounded-lg w-100 min-vh-100"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // init map
      var map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: 13.8282,
          lng: 100.52969,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        },
      });

      // default marker "Bang Sue"
      // var marker = new google.maps.Marker();
      var marker = new google.maps.Marker({
        position: {
          lat: 13.8282,
          lng: 100.52969,
        },
        map,
        title: "Bang Sue",
      });

      // set content an info window
      var infowindow = new google.maps.InfoWindow({
        content: "<div style = 'width:100px;min-height:10px'>Bang Sue</div>",
      }).open(map, marker); // open an info window

      // optional request
      var request_default = {
        location: {
          lat: 13.8282,
          lng: 100.52969,
        },
        radius: 500,
        keyword: "",
        types: ["restaurant"],
      };

      // set maker default Bang Sue for nearby places
      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request_default, function (response) {
        var bangSueMarker, i;

        for (i = 0; i < response.length; i++) {
          bangSueMarker = new google.maps.Marker({
            position: new google.maps.LatLng(
              response[i].geometry.location.lat(),
              response[i].geometry.location.lng()
            ),
            map: map,
          });

          var infowindow_default = new google.maps.InfoWindow();

          var name = response[i].name;

          var prev_infowindow_default = false;

          google.maps.event.addListener(
            bangSueMarker,
            "click",
            (function (bangSueMarker, name, infowindow_default) {
              return function () {
                marker.setMap(null);
                // Close already-opened InfoWindow
                if (prev_infowindow_default) {
                  prev_infowindow_default.close();
                }

                prev_infowindow_default = infowindow_default;

                infowindow_default.setContent(name);
                infowindow_default.setOptions({
                  pixelOffset: new google.maps.Size(0, -42),
                });
                infowindow_default.setPosition(bangSueMarker.getPosition());
                infowindow_default.open(map /* marker */);
              };
            })(bangSueMarker, name, infowindow_default)
          );
        }

        map.setZoom(17);
      });

      // autocompete
      var autocomplelte = new google.maps.places.Autocomplete(
        document.getElementById("auto-complete-search"),
        {
          types: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
          ], //restaurant  establishment
          componentRestrictions: { country: ["TH"] },
          filelds: ["place_id", "name"],
          //   filelds: ["place_id", "geometry", "name"],
        }
      );

      // Add event Change the search location using Place_changed
      autocomplelte.addListener("place_changed", function () {
        // plot the marker for the address location on the Google Map
        var place = autocomplelte.getPlace();

        if (place.geometry) {
          marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
          });

          var windowInfoTambon = new google.maps.InfoWindow();

          windowInfoTambon.setContent(place.name);

          windowInfoTambon.open(map, marker);

          map.setCenter(place.geometry.location);

          var request = {
            location: place.geometry.location,
            radius: 500,
            keyword: "",
            types: ["restaurant"],
          };

          // search restaurant on click autocomplete and set mutiple marker
          // Searching for nearby places
          service.nearbySearch(request, function (response) {
            var new_marker, i;
            console.log('response',response)
            for (i = 0; i < response.length; i++) {
              new_marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                  response[i].geometry.location.lat(),
                  response[i].geometry.location.lng()
                ),
                map: map,
              });

              var prev_infowindow = false;

              var infowindow = new google.maps.InfoWindow();

              var name = response[i].name;

              // click open InfoWindow
              google.maps.event.addListener(
                new_marker,
                "click",
                (function (new_marker, name, infowindow) {
                  return function () {
                    marker.setMap(null);
                    // Close already-opened InfoWindow
                    if (prev_infowindow) {
                      prev_infowindow.close();
                    }

                    prev_infowindow = infowindow;

                    infowindow.setContent(name);
                    infowindow.setOptions({
                      pixelOffset: new google.maps.Size(0, -42),
                    });
                    infowindow.setPosition(new_marker.getPosition());
                    infowindow.open(map /* marker */);
                  };
                })(new_marker, name, infowindow)
              );
            }

            map.setZoom(17);
          });
        }

      });
    },
  },
};
</script>
