import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'
import {createUseStyles} from 'react-jss'

function truncate (string, length = 50) {
  if (string.length <= length) {
    return string
  }

  return string.slice(0, length) + '...'
}

function linkExt (url, label) {
  return <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
}

const useStyles = createUseStyles({
  container: {
    width: '94%',
    marginLeft: '3%',
    height: '400px'
  },
  infoWindowContent: {
    lineHeight: '1.5em'
  },
  infoWindowName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  latlngIcon: {
    position: 'relative',
    top: -2,
    left: -1,
    marginRight: 1
  }
})

const center = {
  lat: 42.672572,
  lng: 23.295803
};

const startZoom = 11;


function Map ({ data }) {
  const classes = useStyles()
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

  if (data) {
    console.log('data is: ', data)
  }


  return isLoaded && data ? (
    <>
      <GoogleMap
        mapContainerClassName={classes.container}
        center={center}
        zoom={startZoom}
        onLoad={onLoadGoogleMap}
        onUnmount={onUnmount}
      >
        <>
        {data.map(({ name, type, description, address, website, physical, online, coordinates, lat, lng}, key) => {
          const isOffline = physical === 'yes'
          const isOnline = online === 'yes'

          return (
            <Marker
              key={key}
              position={{ lat: Number(lat), lng: Number(lng) }}
              onClick={() => handleActiveMarker(key)}
            >
              {activeMarker === key ? (
                <InfoWindow
                  onCloseClick={() => setActiveMarker(null)}
                  options={{
                    maxWidth: 400,
                  }}
                >
                  <div className={classes.infoWindowContent}>
                    <div className={classes.infoWindowName}>&copy; {name}</div>
                    <div>&#8505; {type}</div>
                    {isOffline && <div>&#9782; Физически магазин</div>}
                    {description && <div>&#8505; {description}</div>}
                    {isOnline && <div style={{paddingLeft: 1}}>&#8494; Online търговец</div>}
                    <div>
                    {/* &#8494;   &#64; */}
                    &#8494;&nbsp;&nbsp;{linkExt(website, truncate(website))}
                    </div>
                    <div>&#9873;&nbsp; {address} ({linkExt(`https://www.google.com/maps/search/${address}/`, 'Google Maps')})</div>
                    <div>
                      <span className={classes.latlngIcon}>&#8982;</span>
                      {coordinates} ({linkExt(`https://www.google.com/maps?ll=${coordinates}`, 'Google Maps')})</div>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          )
        })}
        </>
      </GoogleMap>
    </>
  ) : (
    <div>loading map...</div>
  )
}

export default React.memo(Map)
