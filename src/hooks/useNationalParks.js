import { useState, useEffect } from 'react'
import { useNotification } from '../components/Notifications/useNotification'
import services from '../services/nps'

function useNationalParks() {
  const [allLocations, setAllLocations] = useState()
  const [location, setLocation] = useState({
    id: '',
    name: '',
    coordinates: [0, 0],
    parkdata: {},
  })
  const { notificationHandler } = useNotification()

  //gets NPS national parks data
  useEffect(() => {
    services
      .getAll()
      .then((res) => {
        let filteredParks = res.data.filter((park) => {
          return park.designation === 'National Park'
        })
        setAllLocations(filteredParks)
        setLocation({
          id: filteredParks[0].id,
          name: filteredParks[0].name,
          coordinates: [filteredParks[0].latitude, filteredParks[0].longitude],
          parkdata: filteredParks[0],
        })
      })
      .catch((error) => {
        setAllLocations(null)
        setLocation({ id: '', name: '', coordinates: [0, 0], parkdata: {} })
        notificationHandler("We couldn't find that park!", 'error')
      })
  }, [notificationHandler])

  //change nationalpark selected
  const setLocationToSelected = (e) => {
    e.preventDefault()

    const locationData = allLocations.find(
      (el) => el.id === e.target.options[e.target.selectedIndex].id
    )
    let locationCordinates
    if (!locationData) {
      setLocation({ id: '', name: '', coordinates: [0, 0], parkdata: {} })
      notificationHandler("We couldn't find that park!", 'error')
    } else {
      locationCordinates = [locationData.latitude, locationData.longitude]
      setLocation({
        id: `${e.target.options[e.target.selectedIndex].id}`,
        name: `${e.target.options[e.target.selectedIndex].innerHTML}`,
        coordinates: locationCordinates,
        parkdata: locationData,
      })
    }
  }

  return { allLocations, location, setLocationToSelected }
}

export { useNationalParks }
