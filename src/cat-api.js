import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_vgNBhtHrqSCNuFY5Yw3ynDa3Wwt0FCFFW6MIdRMU3Mwdbi99sKE7NevY4DclOQnH";


export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds?api_key=live_vgNBhtHrqSCNuFY5Yw3ynDa3Wwt0FCFFW6MIdRMU3Mwdbi99sKE7NevY4DclOQnH')
    .then((response) => {
      return response.data;
    });
};

export const fetchCatByBreed = (breedId) => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?api_key=live_vgNBhtHrqSCNuFY5Yw3ynDa3Wwt0FCFFW6MIdRMU3Mwdbi99sKE7NevY4DclOQnH&breed_ids=${breedId}`)
    .then((response) => {
      const catData = response.data[0];
      return response.data;
    })
};