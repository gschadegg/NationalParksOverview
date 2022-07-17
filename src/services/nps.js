import axios from 'axios'

const baseURL = 'https://developer.nps.gov/api/v1/'
const apiKey = `api_key=${process.env.REACT_APP_GOVPARKS_KEY}`

const getAll = async () => {
  const req = await axios.get(`${baseURL}parks?limit=456&${apiKey}`)
  return req.data
}

const getActivityList = async (parkCode) => {
  const req = await axios.get(
    `${baseURL}thingstodo?parkCode=${parkCode}&limit=10&${apiKey}`
  )
  return req.data
}

const services = {
  getAll,
  getActivityList,
}
export default services
