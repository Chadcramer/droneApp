import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios'

import "./App.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);
  const flightsUrl = "http://localhost:3001/api/flights";

  // Initialize map  
  const map = new mapboxgl.Map({
    container:'map',
    // See style options here: https://docs.mapbox.com/api/maps/#styles
    style: "mapbox://styles/chadpcramer/ckfms5cfk032619rw06rkks14",
    center: [-104.9876, 39.7405],
    zoom: 4
  });

  // when component mounts
  useEffect(() => {
    const buildLocationList = (data, flyToStore, createPopUp) => {
      data.features.forEach(function(store, i){

        let prop = store.properties;
        /* Add a new listing section to the sidebar. */
        let listings = document.getElementById('listings');
        
        let listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = "listing-" + prop.id;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';
    
        /* Add the link to the individual listing created above. */
        let link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = "link-" + prop.id;
        link.innerHTML = prop.address;
  
        
    
        /* Add details to the individual listing. */
        let details = listing.appendChild(document.createElement('div'));
        details.innerHTML = prop.droneID;
        if (prop.phone) {
          details.innerHTML += ' · ' + prop.phoneFormatted;
        }

        link.addEventListener('click', function(e){
          console.log('here', data.features[0]);
          console.log('here2', data.features);
          
          var clickedListing = data.features[0];
          flyToStore(clickedListing);
          createPopUp(clickedListing);
        
          var activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          this.parentNode.classList.add('active');
        });
      });

      

    }

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      async function getFlightData() {
        try {
          await axios.get(flightsUrl).
            then ( response => {
              console.log(response.data);
              // now add the layer, and reference the data source 
              map.addLayer({
                "id": "locations",
                "type": "symbol",
                /* Add a GeoJSON source containing place coordinates and information. */
                "source": {
                  "type": "geojson",
                  "data": response.data
                },
                "layout": {
                  "icon-image": "airport-15",
                  "icon-allow-overlap": true,
                }
              });
              function flyToStore(currentFeature) {
                
                map.flyTo({
                  center: currentFeature.geometry.coordinates,
                  zoom: 15
                });
              }
              
              function createPopUp(currentFeature) {
                var popUps = document.getElementsByClassName('mapboxgl-popup');
                /** Check if there is already a popup on the map and if so, remove it */
                if (popUps[0]) popUps[0].remove();
              
                var popup = new mapboxgl.Popup({ closeOnClick: false })
                  .setLngLat(currentFeature.geometry.coordinates)
                  .setHTML('<h3>Drones</h3>' +
                    '<h4>' + currentFeature.properties.address + '</h4>')
                  .addTo(map);
              }

              buildLocationList(response.data, flyToStore, createPopUp)

              map.addSource('route', {
                'type': 'geojson',
                'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                'type': 'LineString',
                'coordinates': [
                [          -122.779297,
                  39.329860],
                [          -71.530467,
                  43.355694],
                [-122.48339653015138, 37.83270036637107],
                [-122.48356819152832, 37.832056363179625],
                [          -77.043929,
                  38.910525],
                [          -77.0672,
                  38.90516896],
                [-83.341924,
                  33.692369],
                [-81.740541,
                  29.294312],
                [-77.097083330154,
                  38.980979],
                [-120.563844,
                  43.238202],
                [-123.054885,
                  46.850817],
                [-118.734488,
                  34.674358],
                [-117.108640,
                  32.793383],
                [-72.720167,
                  41.366268],
                [-122.48888969421387, 37.83297152392784],
                [-122.48987674713133, 37.83263257682617],
                [-122.49043464660643, 37.832937629287755],
                [-122.49125003814696, 37.832429207817725],
                [-122.49163627624512, 37.832564787218985],
                [-122.49223709106445, 37.83337825839438],
                [-122.49378204345702, 37.83368330777276]
                ]
                }
                }
                });
                map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': 'green',
                'line-width': 1
                }
                });
            });

            
        } catch (err) {
          console.log('error: ', err);
        }
      }
      getFlightData();
      
      

    });
  }, []); 

  
  return (
    <>
      <div className="map-container" ref={mapContainerRef} />
    </>
  )
};

export default App;