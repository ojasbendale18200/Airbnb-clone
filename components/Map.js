import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

function Map({ searchResult }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform Search Result object into
  //  { latitude: 52.516272, longitude: 13.377722 } Object

  const coordinate = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //   The lattitude and longitude of the center of the location of coordinate
  const center = getCenter(coordinate);

  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  console.log(center);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/ojasbendale18200/ckyzpzn0l009m15ldftz3xpng" //this both values coming from mapbox
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewPort(nextViewport)} //this can chnage lat and lang when we change map direction
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
            >
              📌
            </p>
          </Marker>

          {/* the Popup show in when we click the marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              latitude={result.lat}
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
