import axios from "axios";
export default axios.create({
    baseURL:'https://muscle-group-image-generator.p.rapidapi.com/getImage',
    headers: {
        'X-RapidAPI-Key': '204c9e1f81msh7d59ffa394f26d2p191336jsnfbbaac2259cc',
        'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com'
      },
      responseType: "arraybuffer"
})