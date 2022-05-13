import { apiSettings } from './settings';

const { BASE_URL, API_KEY } = apiSettings;

function fetchImages({ searchQuery, currentPage }) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&per_page=12&page=${currentPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет покемона с именем ${searchQuery}`));
  });
}

const api = {
  fetchImages,
};

export default api;
