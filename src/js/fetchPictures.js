import axios from 'axios';

export default class PicsApiService {
  constructor() {
    this.perPage = 40;
    this.limit = 1;
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPictures() {
    const URL = `https://pixabay.com/api/?key=31464693-d75cfa2173f50c5c58c4492db&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;

    const response = await axios.get(URL);
    this.page += 1;
    this.limit = response.data.totalHits / this.perPage;
    return response.data;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
