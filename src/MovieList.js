import { useState,useEffect } from "react";
import { Movie } from "./Movie";
import { AddMovie } from "./AddMovie";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useHistory } from "react-router";

const API_URL = "https://pandi-selvi.herokuapp.com";

export function MovieList() {
    const history = useHistory(); 
  const [movies, setMovies] = useState([]);
 
  const getMovies = () => {
    fetch(`${API_URL}/movies`,{
     method:"GET",   
    })

    .then((data)=> data.json())
    .then((mvs)=>setMovies(mvs));
  }

  useEffect(getMovies,[]);

  return (
    <section>
      <div className="movie-list">
        {movies.map((mv, index) => (
          <Movie
            key={index}
            name={mv.name}
            poster={mv.poster}
            rating={mv.rating}
            summary={mv.summary}
            id={mv.id}
            setMovies={setMovies}
            movies={movies} 
            getMovies={getMovies}
            />
        ))}
      </div>
    </section>

  );
}