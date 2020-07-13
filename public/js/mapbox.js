/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZXJpY2tzZzkzIiwiYSI6ImNrY2JhaW51OTFvenQyd3FwYjZuZmY0b3IifQ.MGDwMEF8fMzWyFjupiCXeQ';

  var map = new mapboxgl.Map({
    container: 'map', //id que coincide con el id de html
    style: 'mapbox://styles/ericksg93/ckcbansvx5yjh1ip6aa6y5yi8',
    scrollZoom: false,
    //center: [-118.113491, 34.111745],
    //zoom: 10,
    //interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Create Marker
    const el = document.createElement('div');
    el.className = 'marker'; //viene del css

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map); //variable map definida arriba

    //Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
      .addTo(map);

    //extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
