import {Link} from 'react-router-dom'
import "./MovieCard.scss"

function MovieCard (props){
    return (
        <div className='movieCard'>
            <Link to={`/moviedetails/${props.movie?.imdbID}`} className="movieLink">
                <img className = "moviePoster" src={props.movie.Poster} alt=""></img>
                <h5 className="movieTitle">{props.movie.Title}</h5>
            </Link>
        </div>
    )
}
export default MovieCard