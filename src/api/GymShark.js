import axios from "axios";
export default axios.create({
    baseURL: 'https://gymshark.p.rapidapi.com/2022-12/gymshark/latestproducts',
    headers: {
      'X-RapidAPI-Key': '204c9e1f81msh7d59ffa394f26d2p191336jsnfbbaac2259cc',
      'X-RapidAPI-Host': 'gymshark.p.rapidapi.com'
    }
})