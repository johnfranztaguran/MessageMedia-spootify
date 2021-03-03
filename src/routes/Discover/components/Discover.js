import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import Access from '../../../request';
import '../styles/_discover.scss';

const request = new Access();

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }
  componentDidMount() {
    this.setNewReleases();
    this.setFeaturedPlaylists();
    this.setCategories();
  }

  setNewReleases = async () => {
    try {
      const newReleases = await request.getSpotifyNewReleases();
      console.log('newReleases', newReleases);
      this.setState({ newReleases });
    } catch (err) {
      console.error('Error while fetching data:', err);
    };
  };

  setFeaturedPlaylists = async () => {
    try {
      const playlists = await request.getSpotifyFeaturedPlaylists();
      console.log('playlists', playlists);
      this.setState({ playlists });
    } catch (err) {
      console.error('Error while fetching data:', err);
    };
  }

  setCategories = async () => {
    try {
      const categories = await request.getSpotifyCategories();
      console.log('categories', categories);
      this.setState({ categories });
    } catch (err) {
      console.error('Error while fetching data:', err);
    };
  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
