import axios from 'axios'
export default axios.create({
    baseURL:"https://us-central1-seatallocation-5da65.cloudfunctions.net/api"
})