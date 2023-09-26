import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api"; 

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

const addOption = (select, text) => {
  const option = document.createElement('option');
  option.textContent = text;
  select.appendChild(option);
};

const showLoader = () => loader.classList.remove('hidden');
const hideLoader = () => loader.classList.add('hidden');

select.addEventListener('change', () => {
  const selectedBreed = select.value;
  showLoader();
  catInfo.innerHTML = '';

  fetchCatByBreed(selectedBreed)
    .then((catData) => {
      hideLoader();
      const image = document.createElement('img'); 
      image.src = catData.imageUrl; 
      image.alt = 'Cat'; 
      image.classList.add('cat'); 
      catInfo.appendChild(image);
      const breed = document.createElement('p');
      breed.textContent = `Breed: ${catData.breedName}`;
      catInfo.appendChild(breed);
      const description = document.createElement('p');
      description.textContent = `Description: ${catData.description}`;
      catInfo.appendChild(description);
      const temperament = document.createElement('p');
      temperament.textContent = `Temperament: ${catData.temperament}`;
      catInfo.appendChild(temperament);
    })
    .catch(() => {
      hideLoader();
      Notiflix.Notify.failure('Not found');
    });
});

fetchBreeds()
  .then((breedsData) => {
    breedsData.forEach((breed) => {
      addOption(select, breed.name);
    });
    hideLoader();
  })
  .catch(() => {
    Notiflix.Notify.failure('Not found');
    hideLoader();
  });