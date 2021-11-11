import { useEffect, useState } from 'react';
import Search from './components/Search';
import Content from './components/Content';
import axios from 'axios';
import { FETCH_MOVIE_URL, API_KEY } from './dataSet';
import './App.css';

function App() {

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    fetchMovieApi(157336);
    // Your code here
  }, []);

  const fetchMovieApi = (movieId) => {
    axios.get(`${FETCH_MOVIE_URL}${movieId}?&api_key=${API_KEY}`, {
      params: {
      }
    })
      .then(function (response) {
        let data = response.data;
        setMovieDetails({
          movieID: data.id,
          original_title: data.original_title,
          tagline: data.tagline,
          overview: data.overview,
          homepage: data.homepage,
          poster: data.poster_path,
          production: data.production_companies,
          production_countries: data.production_countries,
          genre: data.genres,
          release: data.release_date,
          vote: data.vote_average,
          runtime: data.runtime,
          revenue: data.revenue,
          backdrop: data.backdrop_path
        })
      })
  }
  return (
    <div className="App lg:h-screen text-white">
      <div className="lg:mx-40 md:mx-12">

        <Search searchMovie={fetchMovieApi}></Search>
        <Content data={movieDetails}></Content>
      </div>
    </div>
  );
}

export default App;
