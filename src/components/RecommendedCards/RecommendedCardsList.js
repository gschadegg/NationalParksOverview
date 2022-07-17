import React from 'react'
import PropTypes from 'prop-types'
import RecommendedCard from './RecommendedCard'
import './RecommendedCard.scss'

const RecommendedCardsList = ({ activitiesList }) => {
  //creates list of recommended activity cards
  const activityCards = () => {
    if (activitiesList) {
      return activitiesList.map((item) => {
        return <RecommendedCard key={item.id} activity={item} />
      })
    }
  }

  return <>{activityCards()}</>
}
RecommendedCardsList.propTypes = {
  activitiesList: PropTypes.array,
}
export default RecommendedCardsList
