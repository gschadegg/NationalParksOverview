import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import services from './../../services/nps'

import './LocationDetails.scss'
import RecommendedCardsList from './../RecommendedCards/RecommendedCardsList'
import globeIcon from './../../assets/globe.png'
import locationIcon from './../../assets/location.png'

const LocationDetails = ({ location }) => {
  const [showTags, setShowTags] = useState(false)
  const [activitiesList, setActivitiesList] = useState(null)

  useEffect(() => {
    services
      .getActivityList(location.parkCode)
      .then((res) => {
        if (res.data.length <= 0) {
          setActivitiesList(null)
        } else {
          setActivitiesList(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [location])

  let LocationActivites = location?.activities?.map((act) => {
    return (
      <div key={act.id} className="activityTag">
        {act.name}
      </div>
    )
  })

  let secLocationActivites
  if (LocationActivites?.length > 10) {
    secLocationActivites = LocationActivites.splice(
      10,
      LocationActivites.length
    )
    LocationActivites = LocationActivites.splice(0, 10)
  }

  return (
    <>
      <article id="mapDetails" className="dataColumn_container">
        {location.fullName && (
          <>
            <section className="dataContainer_header">
              <h2>{location.fullName}</h2>
              <a
                title="Check Out Park On NPS.gov"
                target="_blank"
                rel="noreferrer"
                href={location.url}
              >
                <img
                  src={globeIcon}
                  alt="globe icon"
                  width="20px"
                  height="20px"
                />
              </a>
            </section>
            <span className="dataContainer_state">{location.states}</span>
            <p className="dataContainer_desc">{location.description}</p>
            <div className="dataContainer_activitiesTags">
              {LocationActivites}
              {showTags ? secLocationActivites : ''}
              <button
                className="activitiesTag_showBtn"
                onClick={() => setShowTags((prev) => !prev)}
              >
                {showTags
                  ? 'Hide Available Activities'
                  : 'Show More Available Activities'}
              </button>
            </div>
            {activitiesList ? (
              <>
                <div className="divider"></div>
                <section className="dataContainer_recommended">
                  <h3>
                    <img
                      src={locationIcon}
                      alt="location marker icon"
                      width="18px"
                      height="18px"
                    />
                    Recommended Activities
                  </h3>
                  <div className="dataContainer_cardWrap">
                    <RecommendedCardsList activitiesList={activitiesList} />
                  </div>
                </section>
              </>
            ) : (
              ''
            )}
          </>
        )}
      </article>
    </>
  )
}

LocationDetails.propTypes = {
  location: PropTypes.object,
}
export default LocationDetails
