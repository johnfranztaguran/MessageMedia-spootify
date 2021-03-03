import axios from 'axios';
import config from '../config';
import querystring from 'querystring';

const headers = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
};

const data = {
  grant_type: "client_credentials",
  client_id: config.api.clientId,
  client_secret: config.api.clientSecret,
};

class Request {
	requestToken = async () => {
		try {
			const accessData = await axios.post(config.api.authUrl,
				querystring.stringify(data),
    		headers
			);
			localStorage.setItem('token', btoa(JSON.stringify(accessData.data.access_token)));
			localStorage.setItem('access-data', btoa(JSON.stringify(accessData.data)));
			return accessData;
		} catch(err) {
			console.error('Error: ', err);
		};
	};

	get token() {
		const token = localStorage.getItem('token');
    const accesstoken = JSON.parse(atob(token));
		const getData = localStorage.getItem('access-data');
		const setAccessData = JSON.parse(atob(getData));
		var now = new Date();
		const expiryDate = new Date(now.getTime() + setAccessData.expires_in*1000);
    if (accesstoken && expiryDate > now) {
      return accesstoken;
    }
    accesstoken && localStorage.clear();
    return undefined;
  };

	getSpotifyNewReleases = () => {
		const newReleases = axios.get(`${config.api.baseUrl}new-releases`, {
			headers: {
				'Authorization': `Bearer ${this.token}`
			}
		}).then(res => {
			return res.data.albums.items;
		}).catch(err => console.error('Error: ', err));
		return newReleases;
	};

	getSpotifyFeaturedPlaylists = () => {
		const playlists = axios.get(`${config.api.baseUrl}featured-playlists`, {
			headers: {
				'Authorization': `Bearer ${this.token}`
			}
		}).then(res => {
			return res.data.playlists.items;
		}).catch(err => console.error('Error: ', err));
		return playlists;
	};

	getSpotifyCategories = () => {
		const categories = axios.get(`${config.api.baseUrl}categories`, {
			headers: {
				'Authorization': `Bearer ${this.token}`
			}
		}).then(res => {
			return res.data.categories.items;
		}).catch(err => console.error('Error: ', err));
		return categories;
	};

};

export default Request;
