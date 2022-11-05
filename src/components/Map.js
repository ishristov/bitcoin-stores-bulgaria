import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'

function truncate (string, length = 50) {
  if (string.length <= length) {
    return string
  }

  return string.slice(0, length) + '...'
}

function linkExt (url, label) {
  return <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
}

const containerStyle = {
  width: '94%',
  marginLeft: '3%',
  height: '400px'
};

const center = {
  lat: 42.672572,
  lng: 23.295803
};

const startZoom = 11;

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}

function Map ({
  data
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDNjOOCByF4SF8zsCxv4h8tS1i5qA2IQsA"
  })

  useEffect(() => {
  
  }, [])

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds(center);
  //   // map.fitBounds(bounds);
  //   center = bounds.getCenter();
  //   map.setCenter(center);
  //   setMap(map)
  // }, [])


  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker)
  }

  const onLoadGoogleMap = (map) => {
    // const bounds = new google.maps.LatLngBounds()
    // markers.forEach(({ position }) => bounds.extend(position))
    // map.fitBounds(bounds)
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={startZoom}
        onLoad={onLoadGoogleMap}
        onUnmount={onUnmount}
      >
        <>
        {data.objects.map(({ name, type, description, address, website, physical, online, lat, lng }, key) => (
          <Marker
            key={key}
            position={{ lat, lng }}
            onClick={() => handleActiveMarker(key)}
          >
            {activeMarker === key ? (
              <InfoWindow
                onCloseClick={() => setActiveMarker(null)}
                options={{
                  maxWidth: 400,
                }}
              >
                <div style={{
                  lineHeight: '1.5em'
                }}>
                  <div style={{
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}>&copy; {name}</div>
                  <div>&#8505; {type}</div>
                  {physical && <div>&#8505; Физически магазин</div>}
                  {online && <div>&#8505; Online търговец</div>}
                  {description && <div>&#8505; {description}</div>}
                  <div>
                    &#64; {linkExt(website, truncate(website))}
                  </div>
                  <div>&#9873;&nbsp; {address} ({linkExt(`https://www.google.com/maps/search/${address}/`, 'Google Maps')})</div>
                  <div>&#8982; {lat}, {lng} ({linkExt(`https://www.google.com/maps?ll=${lat},${lng}`, 'Google Maps')})</div>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        </>
      </GoogleMap>
    </>
  ) : (
    <div>loading...</div>
  )
}

export default React.memo(Map)
