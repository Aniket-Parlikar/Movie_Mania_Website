//Importing all the necessary packages
import {useEffect, useState} from 'react';

// Importing the MovieCard component
import MovieCard from './MovieCard';

// Importing the css component 
import './App.css';

import SearchIcon from './search.svg'

// defining the API url to obtain information about the movie database
const API_URL = 'https://omdbapi.com?apikey=YOURTOKENHERE';

const App = () =>
{
    
    const [movies, setMovies] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) =>
    {
        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json(); //gets the data from response

        setMovies(data.Search);
    }

    //Something that changes on the website
    useEffect(() =>
    {
        searchMovies('Transformers')
    },[]);

    return (
        <div className="app">
            <h1>Movie Mania</h1>

            <div className='search'>
                <input
                    placeholder='Search for a movie'
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    />

                    <img
                        src = {SearchIcon}
                        alt = "search"
                        onClick={()=> searchMovies(searchTerm)}
                        ></img>
            </div>

            {
                movies ?.length > 0
                    ?(
                        <div className='container'>
                            {movies.map((movie) => (
                            <MovieCard movie = {movie}/>
                           ) )}
                            </div>
                    ) : (
                        <div className = 'container'>
                            <h2>No movies found</h2> 
                        </div>
                    )
            }
        </div>
    )
}

export default App;