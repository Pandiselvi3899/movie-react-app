import { useState,useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";

export function EditMovie() {
    const history=useHistory();
    const { id } = useParams();
    // const movie = movies[id];
    const [movie, setMovie] = useState(null);

    const API_URL = "https://pandi-selvi.herokuapp.com";
 
    useEffect(()=>{
        fetch(`${API_URL}/movies`+id,{
           method: "GET", 
        })
      .then((data)=> data.json())
      .then((mv)=>setMovie(mv));
    },[]);

return movie? <EditMovieForm movie={movie} id={id}/>:"";
   
   
}


const editMovieValidationSchema=yup.object({
    name:yup.string()
          .required("Enter Movie name 😒"),
    poster:yup.string()
        // .matches(/(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i,"Enter valid  URL 😒")
        //  .matches(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i,"Enter valid  URL 😒")
          .required("Enter proper Poster URL 😒")
          .min(10,"Enter valid  URL 😒"),
    rating:yup.number()
           .min(0)
           .max(10)
          .required("Enter Rating as Number /10 😒"),
    trailer:yup.string()
            .matches(/(https|http):\/\/(?:www\.)?youtube.com\/embed\/[A-z0-9]+/i,"Enter valid  URL 😒")
          .required("Enter proper  URL 😒"),
    summary:yup.string()
          .min(20)
          .required("Enter Movie Plot 😒"),
})




function EditMovieForm({movie,id}) {
    const history=useHistory();

    const editmovie = (updatedMovie) => {
        console.log("onSubmit",updatedMovie);
        // const updatedMovie = { name, poster, rating, summary,trailer };
        
        const API_URL = "https://pandi-selvi.herokuapp.com";

        fetch(`${API_URL}/movies`+id,{
            method:"PUT",
            body:JSON.stringify(updatedMovie),
            headers: { 'Content-Type': 'application/json'}
        }).then(()=>{
            history.push('/movie');
        }).catch((error)=>console.log(error)) ;



    };


    const{handleSubmit,handleBlur,handleChange,values,errors,touched}= useFormik({
        initialValues:{ 
            name: movie.name,
             poster:movie.poster,
             rating:movie.rating,
             summary:movie.summary,
             trailer:movie.trailer},
       validationSchema:editMovieValidationSchema,
         onSubmit:editmovie
    });



    

    return (
        <form 
        onSubmit={handleSubmit}
        className="add-movie-form">
            <TextField
                variant="outlined"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
                error={errors.name && 
                    touched.name}
                helperText={errors.name && 
                    touched.name && errors.name} />

            <TextField
                value={values.poster}
                id="poster"
                name="poster"
                onChange={handleChange}
                onBlur={handleBlur}
                label="PosterURL"
                variant="outlined" 
                error={errors.poster && 
                    touched.poster}
                helperText={errors.poster && 
                    touched.poster && errors.poster}
                />          

            <TextField
                type="number"
                value={values.rating}
                id="rating"
                name="rating"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Rating"
                variant="outlined"
                error={errors.rating && 
                    touched.rating}
                helperText={errors.rating && 
                    touched.rating && errors.rating}
                />
             <TextField

                value={values.trailer}
                id="trailer"
                name="trailer"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Trailer"
                variant="outlined"
                error={errors.trailer && 
                    touched.trailer}
                helperText={errors.trailer && 
                    touched.trailer && errors.trailer}
                />

            <TextField
                value={values.summary}
                id="summary"
                name="summary"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Summary"
                variant="outlined"
                error={errors.summary && 
                    touched.summary}
                helperText={errors.summary && 
                    touched.summary && errors.summary}
                />


            <div className="edit-buttons">
                <Button
                color="error"
                variant="contained"
                onClick={()=>{history.push('/movie')}}
                
                >Cancel</Button>

                <Button
                color="success"
                type="submit"
                variant="contained"
                // onClick={editmovie}
                // onClick={editmovie}
                
                >Save</Button>
                
            </div>

        </form>
    );

}