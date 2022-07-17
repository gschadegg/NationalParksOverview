import React from 'react'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
import './../../styles/NationalParksMap.scss'

import LocationMarker from './../../assets/locationMarker.png'

const MapPlaceholder = () => {
  return (
    <p>
      Map of National Parks.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const ParkMap = ({ location }) => {
  let position
  if (!location.coordinates) {
    position = [0, 0]
  } else {
    position = location.coordinates
  }

  const ChangeView = ({ center }) => {
    const map = useMap()
    map.setView(center)
    return null
  }

  let iconMarker = new L.Icon({
    iconUrl: LocationMarker,
    iconRetinaUrl: LocationMarker,
    popupAnchor: [-0, -0],
    iconSize: [80, 80],
  })

  return (
    <div className={'leafletMap-container'}>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: '100%' }}
        closePopupOnClick={false}
        placeholder={<MapPlaceholder />}
      >
        <ChangeView center={position} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={iconMarker}>
          <Popup>{location.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default ParkMap
