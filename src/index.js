import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '42459291-7f50c47c6b19e5b61fce58d70',
  q: 'query',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

const fetchPhotos = axios
  .get(`https://pixabay.com/api/${searchParams}`)
  .then(response => response.data);
