import { createContext, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import { useEffect } from "react";


//-----------App Bar----------------
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useHistory } from "react-router";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
//-----------------------------

//-------Components------------
import { ColorBox} from "./colorgame";
import { ColorList } from "./ColorList";
import { MovieList } from "./MovieList";
import { NotFound } from "./NotFound";
import { Welcome } from "./Welcome";
import { AddMovie } from "./AddMovie";
import { EditMovie } from "./EditMovie";
import { MovieDetails } from "./MovieDetails";
import { TicTacToe } from "./TicTacToe";
import { BasicForm } from "./BasicForm";

//-----------------------


// creating context
const initialState=10;
const context=createContext(null); //null is the default value if provider is missing

const MyGrandChild=()=>{
  const {state,setState}=useContext(context);
  console.log({state,setState});
  const increment=()=>{
    setState(state+1);
  };
  return(
    <div>
      <button
onClick={increment}>increment
</button>
{state}
    </div>
  );
}

const Mychild=()=>{
  return(
    <div>
      <MyGrandChild/>
    </div>
  );
};




function App() {
const history=useHistory();
const [movies, setMovies] = useState([]);
 
  useEffect(()=>{
    fetch("https://react-movie-app-api.herokuapp.com/movies")
    .then((data)=> data.json())
    .then((mvs)=>setMovies(mvs));
  },[]);

const[mode,setMode]=useState(true);
const theme = createTheme({
  palette: {
    mode:mode?"light":"dark",
  },
});

  const [state,setState]=useState(initialState);
    const obj={state:state,setState:setState};
  return (
    <ThemeProvider theme={theme}>
     <Paper style={{minHeight:"100vh"}} elevation={6}>
   
    <div className="App">

{/* <context.Provider value={obj}>
       <div>
        <Mychild/>
      </div>
    </context.Provider> */}



<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
<Toolbar>
<Button
onClick={()=>history.push('/')}
startIcon={<HomeIcon/>}
color="inherit" > Home</Button>
<Button
onClick={()=>history.push('/movie')}
startIcon={<LocalMoviesIcon/>}
 color="inherit">Movies</Button>
<Button
onClick={()=>history.push('/movies/add')}
startIcon={<AddToQueueIcon/>}
  color="inherit" >Add Movies</Button>
<Button
onClick={()=>history.push('/colorgame')}
startIcon={<ColorLensIcon/>}
  color="inherit" >Color Game</Button>
<Button
onClick={()=>history.push('/tic-tac-toe-game')}
startIcon={<SportsEsportsIcon/>}
  color="inherit" >TicTacToe Game</Button>
<Button
onClick={()=>history.push('/basicform')}
startIcon={<FormatAlignJustifyIcon/>}
  color="inherit" >BasicForm</Button>
<Button
startIcon={mode ?<DarkModeIcon/>  :<LightModeIcon/> }
style={{ marginLeft: "auto" }}
onClick={()=>setMode(!mode)}
  color="inherit" >{mode?"dark":"light"} Mode</Button>
</Toolbar>
      </AppBar>
      </Box>

      <Switch>
      
    <Route path="/movie">
        <MovieList /> 
    </Route>
    <Route path="/movies/add">
      <AddMovie />
    </Route>
    <Route path="/tic-tac-toe-game">
        <TicTacToe /> 
    </Route>
{/* ---------------------------------- */}
    <Route exact path="/movies/edit/:id">
      <EditMovie  />
      {/* edit movie */}
    </Route>

    <Route exact path= "/movies/:id">
      <MovieDetails />
    </Route>
{/* ---------------------------------- */}

    <Route path="/films">
        <Redirect to="/movie"/> 
    </Route>
    <Route exact path="/basicform">
          <BasicForm />
      </Route>
        <Route path="/colorgame">
        <ColorList/>
        <ColorBox/>
        </Route>
        <Route exact path="/">
          <Welcome />
      </Route>
       
      <Route path= "**">
        <NotFound />
      </Route>

       
      </Switch>
     {/* <ColorList/> */}
     {/* <MovieList/> */}
    </div>
    </Paper>
    </ThemeProvider>
  );
}




export default App;


