import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_vgNBhtHrqSCNuFY5Yw3ynDa3Wwt0FCFFW6MIdRMU3Mwdbi99sKE7NevY4DclOQnH";

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then((response) => {
      return response.data;
    });
};

export const fetchCatByBreed = (breedId) => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?has_breeds=${breedId}`)
    .then((response) => {
      const catData = response.data[0];
      return {
        imageUrl: catData.url,
        breed: catData.breeds[0].name,
        description: catData.breeds[0].description,
        temperament: catData.breeds[0].temperament,
      };
    })
    .catch((error) => {
      throw error;
    });
};