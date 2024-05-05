import React from 'react'
import useGenres from '../hooks/useGenres'

const GenreList = () => {
    const { genres } = useGenres();


  return (
    <ul>
        {genres.map(genre => <li key={genre.id}>{genre.id}</li>)}
    </ul>
)
}

export default GenreList