import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar ,faCalendar} from '@fortawesome/free-solid-svg-icons'
import "./Details.scss"
import Button from "react-bootstrap/Button";
import { useNavigate,useParams} from "react-router-dom";
import axios from "../../API/axios";
import {useDispatch} from 'react-redux';
import { updateSelectedShow } from "../../Redux/movieSlice";
import Toaster from "../Common/Toaster";
import Loader from "../Common/Loader"; 

function Details(){

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {id} = useParams();
    const [movieDetails,setMovieDetails]=useState()
    const [selectedShow,setSelectedShow]=useState()
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
        fetchMovieDetails()
    },[])

    const showMessage = (msg, msgType) => {
        setMessage(msg);
        setType(msgType);
        setShowToast(true);
    };

    const fetchMovieDetails = async()=>{
        try{
            setIsLoading(true);    
            let response = await axios.get(`/Movies/${id}`)
            setMovieDetails(response.data)
            setIsLoading(false);  
        }catch(err){
            setIsLoading(false);  
            showMessage("There was an error while loading Movie details","error")
        }
    }
    
    const selectSeats=()=>{
        dispatch(updateSelectedShow(movieDetails?.Shows[selectedShow]))
        navigate(`/moviedetails/${id}/seats?show=${movieDetails?.Shows[selectedShow]}`)
    }

    const selectShow = (index)=>{
        setSelectedShow(index);
    }

    const renderShows = movieDetails?.Shows.map((show,index)=>{
        const isActive = index === selectedShow;
        return( 
            <div 
                key = {index} 
                className={isActive ? 'activeTime' :'notActiveTime' } 
                onClick={() => {
                if (isActive) {
                    selectShow(null);
                } else {
                    selectShow(index);
                }
            }}
            >
                {show}
            </div>
    )});

    return(
        <>
        <div className="moviedetailscontainer">
            <div>
                    <img src={movieDetails?.Poster} alt=""></img>
            </div>
            <div className='detailsSection'>
                <h1>{movieDetails?.Title}</h1>
                <div>
                    <span>
                        IMDB Rating <FontAwesomeIcon icon={faStar} /> : {movieDetails?.imdbRating}
                    </span>
                </div>
                <div>

                    {movieDetails?.Plot}
                </div>
                <div className="movie-info">
                    <div>
                        <span>Director  :  </span>
                        <span>{movieDetails?.Director}</span>
                    </div>
                    <div>
                        <span>Stars  :  </span>
                        <span>{movieDetails?.Actors}</span>
                    </div>
                    <div>
                        <span>Generes  :  </span>
                        <span>{movieDetails?.Genre}</span>
                    </div>
                    <div>
                        <span>Languages  :  </span>
                        <span>{movieDetails?.Language}</span>
                    </div>
                </div>
                <div className='showsContainer'>
                    <div className='showlabel'>Shows</div>
                    <div className="time-info">
                            {renderShows}
                    </div>
                </div>
                <Button variant="dark" disabled={movieDetails?.Shows[selectedShow]?false:true} onClick={selectSeats}>Book Tickets</Button>
            </div>
        </div>
        <Loader isLoading={isLoading} />
        <Toaster showToast={showToast} setShowToast={setShowToast} message={message} type={type} />
        </>
    )
}


export default Details