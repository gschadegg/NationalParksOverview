import React, { useMemo } from 'react'

import ParkMap from './components/ParkMap/ParkMap'
import LocationDetails from './components/LocationDetails/LocationDetails'
import Notification from './components/Notifications/Notification'

import { useMounted } from './hooks/utils'
import { useNotification } from './components/Notifications/useNotification'
import { useNationalParks } from './hooks/useNationalParks.js'

import './styles/NationalParksMap.scss'

const App = () => {
  const mounted = useMounted()
  const { notification, showNotification } = useNotification()
  const { location, allLocations, setLocationToSelected } = useNationalParks()

  //creates list of NP as select dd options
  const locationOptions = useMemo(() => {
    if (allLocations) {
      return allLocations.map((park) => {
        return (
          <option key={park.name} id={park.id}>
            {park.name}
          </option>
        )
      })
    }
  }, [allLocations])

  return (
    <>
      {mounted && (
        <article className="mapDisplay_wrap">
          <Notification value={{ notification, showNotification }} />
          <section className="mapDisplay_locationList">
            <select onChange={setLocationToSelected} value={location.name}>
              {locationOptions ? locationOptions : <option>loading...</option>}
            </select>
            <span>National Park</span>
          </section>
          <ParkMap location={location} />
          <section className="mapDisplay_locationDataCol">
            {location && <LocationDetails location={location.parkdata} />}
          </section>
        </article>
      )}
    </>
  )
}

export default App
