import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api"; 
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

loader.classList.replace('loader', 'is-hidden');
catInfo.classList.add('is-hidden');

let arrayBreeds = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrayBreeds.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: select,
        data: arrayBreeds
    });
    })
.catch(onError);

select.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    catInfo.classList.add('is-hidden');
    loader.classList.replace('is-hidden', 'loader');
    select.classList.add('is-hidden');
   

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        select.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        catInfo.innerHTML = `<div class=""><img class="cat" src="${url}" alt="${breeds[0].name}" width="600"></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
};

function onError(error) {
    select.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!');
};
   

