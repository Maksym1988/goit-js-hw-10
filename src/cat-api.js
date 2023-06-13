const API_KEY =
  'live_hz1X6RuQ1TfQPMIBLqzfjh8EOwXv2oydJyuKdKvwFhf836BVvhPEUWP8RCYHPqJR';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const ENDPOINT = {
  breeds: 'breeds',
  cat: 'images/search',
};

function fetchBreeds() {
  return fetch(`${BASE_URL}${ENDPOINT.breeds}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}${ENDPOINT.cat}?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
