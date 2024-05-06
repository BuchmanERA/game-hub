import React from 'react'
import useGenres from '../hooks/useGenres'
import useData from '../hooks/useData'

const GenreList = () => {
    const { data } =  useGenres();


  return (
    <List>
        {genres.map(genre => <li key={genre.id}>{genre.id}</li>)}
    </List>
)
}

export default GenreList