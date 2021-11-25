import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CardActions } from '@mui/material';
import { Counter } from "./Counter";
import { useHistory } from "react-router";
import InfoIcon from '@mui/icons-material/Info';

const API_URL = "https://pandi-selvi.herokuapp.com";

// pass data from parent to Child -> Props
export function Movie({ name, poster, rating, summary, id, setMovies, movies ,getMovies
  // DeleteMovieButton
}) {
  //----------------------------------------
  // const movie={name, poster, rating, summary};
  

  const history=useHistory();
  //---------------------------------------------
  const [show, setShow] = useState(true);
  const styles = { display: show ? "block" : "none" };

const deleteMovie=(id) => {
  fetch(`${API_URL}/movies`+id,{
    method:"DELETE"
  }).then(()=>getMovies());

};

  return (
    <Card className="movie-container">
      <img className="movie-poster" src={poster} alt={name} />
      <CardContent>
        <div className="movie-specs">
          <h3 className="movie-name">{name} 
          <IconButton
            onClick={() => history.push('/movies/' + id)}
            color="primary"
            >
            <InfoIcon/>
          </IconButton>
          <IconButton
            onClick={(event) => setShow(!show)}
            color="primary"
          >{show ? <ExpandLessIcon /> : <ExpandMoreIcon />}

          </IconButton></h3>

          <p className="movie-rating">⭐{rating}</p>
        </div>


        <p style={styles}>{summary}</p>

        {/* conditional rendering
            {show? <p  >{summary}</p>:""} */}
      </CardContent>
      <CardActions>
        <Counter />
        <IconButton color="secondary"
          style={{ marginLeft: "auto" }}
         onClick={()=> history.push('/movies/edit/' + id)}
        >

          <EditIcon />
        </IconButton>
        
        <IconButton color="error"
          onClick={() => {deleteMovie(id)}}>

          <DeleteIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
}