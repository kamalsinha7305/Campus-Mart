import axios from 'axios'
import { baseURL } from "../Common/SummaryApi";

const Axios =axios.create({
    baseURL:baseURL,
    withCredentials :true
})

export default Axios ;
