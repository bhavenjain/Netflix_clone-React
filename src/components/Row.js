import React, { useState, useEffect } from 'react'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import axios from '../axios'
import '../public/css/Row.css'

const base_url = 'https://image.tmdb.org/t/p/original/'

function Row ({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    //    If the [] is empty below this means that this code is supposed to run only once and not again and again
    //    If there is a variable in [] then this will be dependent on that variable
    //    In the as fetch url changes the component reloads
    async function fetchData () {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      console.log(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1
    }
  }

  const handleClick = movie => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || '')
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row__posters'>
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
