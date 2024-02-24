import axios from 'axios';
import Notiflix from 'notiflix';

const searchQuery = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', async event => {
  event.preventDefault();
  try {
    const photos = await fetchPhotos();
    renderPhotos(photos);
  } catch (error) {
    console.log(error);
  }
});

const searchParams = new URLSearchParams({
  key: '42459291-7f50c47c6b19e5b61fce58d70',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

const fetchPhotos = async () => {
  searchParams.set('q', searchQuery.elements[0].value.split(' ').join('+'));
  const searchResults = await axios.get(
    `https://pixabay.com/api/?${searchParams}`
  );
  return searchResults.data;
};

// fetchPhotos()
//   .then(({ hits }) => {
//     const markup = hits
//       .map(
//         hit => `<div class="photo-card">
//   <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${hit.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${hit.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${hit.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${hit.downloads}</b>
//     </p>
//   </div>
// </div>`
//       )
//       .join('');
//     gallery.innerHTML = markup;
//   })
//   .catch(error => console.log(error));

function renderPhotos(data) {
  if (data.hits.length <= 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
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
    gallery.innerHTML = markup;
  }
}
