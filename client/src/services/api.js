import axios from 'axios';
// eslint-disabled-next
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('Bearer ');

  if (token != null) {
    // eslint-disable-next-line no-param-reassign
    config.headers['Content-Type'] = 'application/json';
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    };
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (err) => {
  return Promise.reject(err);
});


class Api {
  constructor() {
    this.apiUrl = 'http://localhost:8080/api/';
  }


  // eslint-disable-next-line no-unused-vars
  getLogedin(_email, _password) {
    axios.post('/authenticate', {
      email: _email,
      password: _password,

    }).then((res) => {
      localStorage.setItem('Bearer ', res.data);
    });
  }

  getAll(endpoint) {
    return axios.get(this.getApiEndpoint(endpoint))
      .then((response) => {
        return { error: null, data: response.data };
      })
      .catch((error) => {
        return { error: error };
      });
  }

  getOne(endpoint, id) {
    return axios.get(`${this.getApiEndpoint(endpoint)}/${id}`)
      .then((response) => {
        return { error: null, data: response.data };
      })
      .catch((error) => {
        return { error: error };
      });
  }

  async getAllRestaurantFeedback(endpoint, id) {
    let response; let data;

    try {
      response = await axios.get(`${this.apiUrl}${endpoint}${id}`);
      data = await response.data;
    } catch (error) {
      return null;
    }

    return data;
  }

  getApiEndpoint(endpoint) {
    return this.apiUrl.endsWith('/') ? `${this.apiUrl}${endpoint}` : `${this.apiUrl}/${endpoint}`;
  }
}
export default new Api();
