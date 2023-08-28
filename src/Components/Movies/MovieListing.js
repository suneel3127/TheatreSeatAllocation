import { useEffect, useState } from "react";
import MovieCard from "./MovieCard"
import "./MovieListing.scss"
import axios from "../../API/axios";
import Toaster from "../Common/Toaster";
import Spinner from 'react-bootstrap/Spinner';
import Loader from "../Common/Loader"; 

function MovieListing(){

    const [movieList,setMovieList]=useState([]);
    const [seriesList,setSeriesList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const showMessage = (msg, msgType) => {
        setMessage(msg);
        setType(msgType);
        setShowToast(true);
    };

    useEffect(()=>{
        fetchMovies();
        fetchSeries();
    },[])

    const fetchMovies = async()=>{
        try{
            setIsLoading(true);    
            let response = await axios.get("/Movies")
            setMovieList(response.data)
            setIsLoading(false);  
        }catch(err){
            setIsLoading(false);  
            showMessage("There was an error while loading movies","error")
        }
    }
    const fetchSeries = async()=>{
        try{
            let response = await axios.get("/Series")
            setSeriesList(response.data)
        }catch(err){
            showMessage("There was an error while loading series","error")
        }
    }


    const renderMovieCard = movieList?.map((movie)=>{
            return <MovieCard key={movie.imdbID}  movie={movie}></MovieCard>
            })
    const renderSeriesCard = seriesList?.map((series)=>{
            return <MovieCard key={series.imdbID}  movie={series}></MovieCard>
        })        
    
    return(
        <>
        
        <div className="movieListContainer">
            <div>
                <h3>Recommended Movies</h3>
            </div>
            <div className="MovieList" > 
                {renderMovieCard}
                
            </div>
        </div>    
        <div className="seriesListContainer">
            <div>
                <h3>Recommended Series</h3>
            </div>
            <div className="seriesList" > 
                {renderSeriesCard}
            </div>
        </div>    
        <Loader isLoading={isLoading} />
        <Toaster showToast={showToast} setShowToast={setShowToast} message={message} type={type} />
        </>
    )
}

export default MovieListing