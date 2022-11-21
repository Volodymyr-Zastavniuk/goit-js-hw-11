import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import _throttle from 'lodash.throttle';
import refs from './js/refs';
import PicsApiService from './js/fetchPictures';
import createMarkup from './js/createMarkup';

// import EndlessScroll from './js/observer';

const picsApiService = new PicsApiService();
// const endlessScroll = new EndlessScroll();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

refs.form.addEventListener('submit', onFormSubmit);

refs.loadMoreBtn.addEventListener(
  'click',
  _throttle(loadMore, 1000, { trailing: false })
);

async function onFormSubmit(e) {
  e.preventDefault();
  toggleSubmitBtn();
  hideLoadMoreBtn();
  clearGalleryContainer();

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    return Notiflix.Notify.info('✍ Please enter pictures to show');
  }
  picsApiService.query = searchQuery;
  picsApiService.resetPage();
  try {
    const data = await picsApiService.fetchPictures();
    if (!data.hits.length) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    appendPicsMarkup(data);
    lightbox.refresh();

    if (data.totalHits > picsApiService.perPage) {
      showLoadMoreBtn();
    }
  } catch (error) {
    Notiflix.Notify.error('UPS, something went wrong. Pleae try again later!');
  }
  // endlessScroll.startObserver();
}
// export default
async function loadMore() {
  if (picsApiService.limit <= picsApiService.page - 1) {
    hideLoadMoreBtn();
    return Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }

  try {
    const data = await picsApiService.fetchPictures();
    appendPicsMarkup(data);
    lightbox.refresh();
    autoScroll();
  } catch (error) {
    console.log('ERROR', error);
  }
  // console.log('SET NEW OBSERVER');
  // endlessScroll.startObserver();
}

function appendPicsMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
}
function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}
function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function toggleSubmitBtn() {
  refs.submitBtn.setAttribute('disabled', '');
  setTimeout(() => {
    refs.submitBtn.removeAttribute('disabled');
  }, 1000);
}
function autoScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
