import './style/style.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.setAttribute('id', 'single');
loader.textContent = '';
error.classList.add('is-hidden');
breedSelect.classList.add('is-hidden');

Notiflix.Notify.init({
  position: 'center-top',
  timeout: 3000,
  cssAnimationStyle: 'fade',
  fontFamily: 'Montserrat',
  fontSize: '24px',
  width: '400px',
});

fetchBreeds()
  .then(breeds => markupBreedSelect(breeds))
  .catch(() => {
    loader.classList.add('is-hidden');
    Notiflix.Notify.failure(error.textContent);
  });

function markupBreedSelect(breeds) {
  breedSelect.classList.remove('is-hidden');
  loader.classList.add('is-hidden');
  const markup = breeds
    .map((breed, index) => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.innerHTML = markup;
  new SlimSelect({
    select: '#single',
  });
}

breedSelect.addEventListener('change', onSelectCatBreed);

function onSelectCatBreed(evt) {
  const idCat = evt.currentTarget.value;
  loader.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');

  fetchCatByBreed(idCat)
    .then(data => {
      catInfo.classList.remove('is-hidden');
      loader.classList.add('is-hidden');
      markupCatInfo(data);
    })
    .catch(() => {
      loader.classList.add('is-hidden');
      Notiflix.Notify.failure(error.textContent);
    });
}

function markupCatInfo(arrCats) {
  if (arrCats.length === 0) {
    catInfo.classList.add('is-hidden');
    return Notiflix.Notify.failure(error.textContent);
  }

  const catInfoShow = arrCats
    .map(({ url, breeds }) => {
      const { name, description, temperament } = breeds[0];

      return `<img src="${url}" alt="${name}" class="cat-image" />
          <div class="desc-aside">
            <h2>${name}</h2>
            <p>${description}</p>
            <p><b>Temperament:</b> ${temperament}</p>
          </div>`;
    })
    .join('');

  catInfo.innerHTML = catInfoShow;
}
