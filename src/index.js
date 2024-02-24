import axios from 'axios';
import Notiflix from 'notiflix';

const searchQuery = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('button[type="submit"');
const fetchBtn = document.querySelector('button[type="button"');

let page = 1;
let currentQuery = '';

const searchParams = new URLSearchParams({
  key: '42459291-7f50c47c6b19e5b61fce58d70',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: page,
  per_page: 40,
});

const fetchPhotos = async () => {
  searchParams.set('q', searchQuery.elements[0].value.split(' ').join('+'));
  const searchResults = await axios.get(
    `https://pixabay.com/api/?${searchParams}`
  );
  return searchResults.data;
};

function renderPhotos(data, append = false) {
  if (data.hits.length <= 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    gallery.innerHTML = '';
  } else {
    const markup = data.hits
      .map(
        ({
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
      )
      .join('');

    if (append) {
      gallery.innerHTML += markup;
    } else {
      gallery.innerHTML = markup;
    }
  }
}

searchQuery.addEventListener('submit', async event => {
  event.preventDefault();
  // if (searchQuery === currentQuery) {
  //   page = 1;
  // } else {
  //   currentQuery = searchQuery;
  // }

  try {
    page = 1;
    const photos = await fetchPhotos(searchQuery, page);
    renderPhotos(photos);

    if (photos.hits.length === 0) {
      fetchBtn.classList.add('hidden');
    } else {
      fetchBtn.classList.remove('hidden');
      const dataHits = photos.totalHits;
      Notiflix.Notify.success(`Hooray! We found ${dataHits} images.`);
    }
  } catch (error) {
    Notiflix.Notify.failure(`ERROR: ${error}`);
  }
});

fetchBtn.addEventListener('click', async () => {
  searchParams.set('page', ++page);
  try {
    const photos = await fetchPhotos(currentQuery, page);
    renderPhotos(photos, true);
    if (photos.hits.length === 0) {
      fetchBtn.classList.add('hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure(`ERROR: ${error}`);
  }
});
