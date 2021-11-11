import React, { useState } from 'react';
import axios from 'axios';
import TMDBLogo from "../images/tmdb.svg";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { FETCH_MOVIE_LIST_URL, API_KEY } from '../dataSet';

const Search = (props) => {
    const { searchMovie } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const filterBy = () => true;
    const handleSearch = (search) => {
        axios.get(`${FETCH_MOVIE_LIST_URL}?query=${search}&api_key=${API_KEY}`, {
            params: {
            }
        })
            .then(resp => {
                // resp.data.results.length = 5;
                const options = resp.data.results.map(movie => ({
                    id: movie.id,
                    movie: movie.original_title,
                }));
                setOptions(options);
                setIsLoading(false);
            })
    }
    const selected = (data) => {
        searchMovie(data.id);
    }
    return (
        <div className="w-auto flex xs:p-4 p-10 xs:flex-col">
            <div className="lg:w-2/5 sm:w-2/5 xs:w-full">
                <img src={TMDBLogo} className="logo h-12 xs:m-auto" alt="The Movie Database" />
            </div>
            <div className="lg:w-3/5 sm:w-3/5 xs:w-full">
                <AsyncTypeahead
                    filterBy={filterBy}
                    id="options-overlay"
                    isLoading={isLoading}
                    labelKey="movie"
                    minLength={3}
                    onSearch={(e) => handleSearch(e)}
                    options={options}
                    className="typeahead"
                    placeholder="Search a Movie"
                    renderMenuItemChildren={(option, props) => (
                        <div className="typeahead-option" onClick={() => selected(option)}>
                            <span>{option.movie}</span>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}
export default Search;