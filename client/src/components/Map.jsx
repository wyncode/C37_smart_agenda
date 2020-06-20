// import React, { useEffect, useRef } from 'react';
// import axios from 'axios';
// import mapboxgl, { Map as MapBox, Popup } from 'mapbox-gl';
// import { getLocations, MARKER_LAYER, convertAddressToQuery } from './utils';

// export const MAPBOX_API_KEY =
//   'pk.eyJ1Ijoic3RvbW15MTIzIiwiYSI6ImNqaXh4NXZ6bzA0aHIzd28xcjRvZGJyM2YifQ.h0qUlxu7FnltxVvTFosRDQ';

// const mapOptions = {
//   container: 'map',
//   style: 'mapbox://styles/stommy123/ckbh642so07ek1io87h4v74xw',
//   zoom: 12,
//   center: [-80.2044, 25.8028]
// };

// const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
// const OPTIONS = `countries=US&types=address&access_token=${MAPBOX_API_KEY}`;

// // add more properties and styles to this popup if you want
// export const popupRenderer = (props = {}) => `
//   <div>
//     <p>${props.name}</p>
//   </div>
// `;

// const Map = () => {
//   const mapRef = useRef({ current: null });

//   // when a marker is clicked
//   // we toggle a popup that shows information about that marker
//   // you can give the popup styles by giving the div a className in popupRenderer
//   // you can add show whatever properties you want beyond just a name
//   const handleMarkerClick = (e) => {
//     const marker = e.features[0];

//     const coordinates = marker.geometry.coordinates;

//     new Popup()
//       .setLngLat(coordinates)
//       .setHTML(popupRenderer(marker.properties))
//       .addTo(mapRef.current);
//   };

//   const initializeMap = async () => {
//     // assign your api to mapboxgl's client
//     mapboxgl.accessToken = MAPBOX_API_KEY;

//     // instantiate the map and store it into the map ref to be referenced elsewhere in the code
//     // we cannot store this in state because of the nature of use effect's lexical scoping
//     const map = new MapBox(mapOptions);
//     mapRef.current = map;

//     // this is a mock request
//     // in your app you should make an axios request to your backend
//     const locations = await getLocations();

//     // map over the locations your backend returns
//     // converts the address to a query string to get lng and lat from mapbox api
//     const requests = locations.map((loc) => {
//       const query = convertAddressToQuery(loc);

//       return axios.get(`${BASE_URL}/${query}.json?${OPTIONS}`);
//     });

//     // await all the request to mapbox to return
//     const parsedLocations = await Promise.all(requests);

//     // each response from mapbox is a collection from locations that "matches" the address
//     // we only care about the first location and closest match
//     // once we find this, we merge the mapbox response with our backend data
//     const mergedLocations = parsedLocations.map((loc, index) => {
//       const [closestMatch] = loc?.data?.features || [];

//       return { ...closestMatch, properties: locations[index] };
//     });

//     const geojsonData = {
//       type: 'FeatureCollection',
//       features: mergedLocations
//     };

//     // hook onto the map loading
//     // when it loads we add sources and layer to drop the points
//     map.on('load', () => {
//       map.addSource('markers', { type: 'geojson', data: geojsonData });
//       map.addLayer(MARKER_LAYER);
//       map.on('click', 'markers', handleMarkerClick);
//     });
//   };

//   // when the component mount, we initialize the map
//   useEffect(() => {
//     initializeMap();
//   }, []);

//   return (
//     <div className="map-container" style={{ height: '100vh' }}>
//       <div id="map" style={{ height: '100vh' }} />
//     </div>
//   );
// };

// export default Map;
