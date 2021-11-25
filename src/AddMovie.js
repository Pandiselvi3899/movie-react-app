import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router";
import {useFormik} from "formik";
import * as yup from "yup";



const movieValidationSchema=yup.object({
    name:yup.string()
          .required("Enter Movie name 😊"),
    poster:yup.string()
        // .matches(/(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i,"Enter valid  URL 😊")
        //  .matches(/(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i,"Enter valid  URL 😊")
          .required("Enter proper Poster URL 😊")
          .min(10,"Enter valid  URL 😊"),
    rating:yup.number()
           .min(0)
           .max(10)
          .required("Enter Rating as Number /10 😊"),
    trailer:yup.string()
            .matches(/(https|http):\/\/(?:www\.)?youtube.com\/embed\/[A-z0-9]+/i,"Enter valid  URL 😊")
          .required("Enter proper  URL 😊"),
    summary:yup.string()
          .min(20)
          .required("Enter Movie Plot 😊"),
})


export function AddMovie() {
   
const history=useHistory();

const addnewmovie = (newMovie) => {
    console.log("onSubmit",newMovie);
    // const newMovie = {};

    fetch("https://react-movie-app-api.herokuapp.com/movies",{
        method:"POST",
        body:JSON.stringify(newMovie),
        headers: { 'Content-Type': 'application/json'}
    })
    .then(()=>{
        history.push('/movie');
        // refreshform();
    }).catch((error)=>console.log(error)) ;
};


const{handleSubmit,handleBlur,handleChange,values,errors,touched}= useFormik({
    initialValues:{ name: '', poster: '',rating:"",summary:"",trailer:""},
   validationSchema:movieValidationSchema,
     onSubmit:addnewmovie
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
                    touched.name && errors.name}
                />

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


            <Button variant="contained" type="submit" 
            // onClick={addnewmovie}   should allow formik to allow submit process
            >Add Movie</Button>

        </form>
    );
}