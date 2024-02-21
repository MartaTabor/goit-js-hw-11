import axios from 'axios';
import Notiflix from 'notiflix';

const searchQuery = 'dog';
const gallery = document.querySelector('.gallery');

const searchParams = new URLSearchParams({
  key: '42459291-7f50c47c6b19e5b61fce58d70',
  q: searchQuery.split(' ').join('+'),
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

const fetchPhotos = async () => {
  const searchResults = await axios.get(
    `https://pixabay.com/api/?${searchParams}`
  );
  const searchData = await searchResults.data;
  return searchData;
};

fetchPhotos()
  .then(searchData => console.log(searchData))
  .catch(error => console.log(error));

function renderPhotos(searchData) {
  const markup = searchData
    .map(
      hit => `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${hit.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.innerHTML = markup;
}

renderPhotos();
