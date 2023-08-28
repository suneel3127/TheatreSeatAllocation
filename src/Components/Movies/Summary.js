import "./Summary.scss"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'
import { useNavigate} from "react-router-dom";

function Summary({show,showMessage,handleClose,movieDetails,price,confirmBooking}){

    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(60);
    const [isTimerCompleted, setIsTimerCompleted] = useState(false);
    const selectedSeats=useSelector((state)=>state.state.selectedSeats);
    const selectedShow=useSelector((state)=>state.state.selectedShow);

    useEffect(() => {
      if(show){
        if(seconds > 0){
          const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000);
    
          return () => {
            clearInterval(interval);
          };
        }else{
          setIsTimerCompleted(true);
          showMessage("Session Timed Out","error")
        }
      }else {
          setSeconds(60);
          setIsTimerCompleted(false);
        }
      }, [seconds, show]);

      const RenderSeatDetails = (selectedSeats) => {
        return (
          <div className="seatDetailsContainer">
            <div className="seatDetails">
              {selectedSeats.selectedSeats?.join(', ')} ({selectedSeats.selectedSeats?.length} Tickets)
            </div>
            <div className="seatCost">
              Rs.{price}
            </div>
          </div>
      )}
    
    
      const RenderTotalCharge = () => {
        return (
          <div className="seatDetailsContainer">
            <div className="seatDetails">
              Total
            </div>
            <div className="seatCost">
              Rs.{price}
            </div>
          </div>
      )}
      
      const RenderConfirmButton = () => {
        return (
          <div className="paymentButtonContainer">
            <Button variant="contained" disabled={isTimerCompleted} className="paymentButton" onClick={confirmBooking}>
             {isTimerCompleted ? 'Confirm Booking' : `Confirm Booking (${seconds})` }
            </Button>
          </div>
        )
      }
      

   
    return(
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal show={show} onHide={handleClose} centered>
                
                    <div className="card">
                        <div className="cardTitleContainer">
                            <FontAwesomeIcon icon={faChevronLeft} onClick={handleClose}/>
                            <div className="cardTitle">
                                Checkout
                            </div>
                        </div>
                        <p className="movieName">{movieDetails?.Title}</p>
                        <p className="movieName">{selectedShow}</p>
                        <RenderSeatDetails selectedSeats={selectedSeats}/>
                        <hr className="hrStyle"/>
                        <RenderTotalCharge selectedSeats={selectedSeats}/>
                        <RenderConfirmButton />
                    </div>
            </Modal>
        </div>
    )
}
export default Summary