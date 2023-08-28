import "./Seats.scss"
import Image1 from "../../Images/screen.png";
import { useEffect, useState } from "react";
import { useNavigate,useParams,Link, useLocation} from "react-router-dom";
import axios from "../../API/axios";
import Button from "react-bootstrap/Button";
import {useSelector , useDispatch} from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Summary from "./Summary";
import { updateSelectedSeats,updateSelectedShow } from "../../Redux/movieSlice";
import Form from 'react-bootstrap/Form';
import Toaster from "../Common/Toaster";
import Loader from "../Common/Loader"; 

function Seats(){
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let selectedShow = useSelector((state)=>{
    if(state.state.selectedShow.length>0){
        return (state.state.selectedShow)
      }else{
        return (new URLSearchParams(location.search).get('show'))
      }})
  const {id} = useParams();
  const [seatDetails,setSeatDetails]=useState()
  const [movieDetails,setMovieDetails] = useState()
  let selectedSeats = [];
  let rowPrices = null;
  const [priceDetails,setPriceDetails] = useState()
  const [totalPrice,setTotalPrice] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isLoading,setIsLoading]=useState(false);

  const showMessage = (msg, msgType) => {
      setMessage(msg);
      setType(msgType);
      setShowToast(true);
  };


  useEffect(()=>{
          fetchSeatingDetails()
    },[selectedShow])
 

  const fetchSeatingDetails = async()=>{
    try{
      setIsLoading(true);    
    let response = await axios.get(`/Movies/${id}`)
    setIsLoading(false);    
    setMovieDetails(response.data)
    let seats = response.data.SeatingOptions.filter(x=>{
      
      if(x.Time == selectedShow){
        rowPrices = x.Prices
        return x;
      }
    })[0]?.Seats;
    setPriceDetails(rowPrices)
    setSeatDetails(seats)
    }catch(err){
      setIsLoading(false);    
      showMessage("There was an error while loading Movie details","error")
    }
  }


  const changeShow = (e) => {
    dispatch(updateSelectedShow(e.target.value))
  }  
   

  const getClassNameForSeats = (seatValue) => {
        let dynamicClass;
        if (seatValue === 0) {  // Not booked
          dynamicClass = "seatNotBooked";
        }else if (seatValue === 1) {  // booked
          dynamicClass = "seatBooked";
        } else if (seatValue === 2) {  // Seat Selected
          dynamicClass = "seatSelected";
        } else { // Seat Blocked
          dynamicClass = "seatBlocked";
        }
        return `${"seats"} ${dynamicClass}`
      }

    const RenderSeats = () => {
        let seatArray = [];
        for(let key in seatDetails) {
          let colValue = seatDetails[key].map((seatValue, rowIndex) => (
            <span key={`${key}.${rowIndex}`} className="seatsHolder">
              {rowIndex === 0 && <span className="colName">{key}</span>}
              <OverlayTrigger overlay={<Tooltip id={id}>{"Rs."+priceDetails[key]}</Tooltip>}>
                <span className={getClassNameForSeats(seatValue)} style={Number.isInteger((rowIndex+1)/4)?{marginRight:"50px"}:{}} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
                  {rowIndex+1}
                </span>
              </OverlayTrigger>
              {seatDetails && rowIndex === seatDetails[key].length-1 && <><br/><br/></>}
            </span>
          ))
          seatArray.push(colValue);
        }
        return (
          <div className="seatsLeafContainer">{seatArray}</div>
        ) 
      }

      const RenderPaymentButton = () => {
        selectedSeats = [];
        for(let key in seatDetails) {
          seatDetails[key].forEach((seatValue, seatIndex) => {
            if (seatValue === 2) {
              selectedSeats.push(`${key}${seatIndex+1}`)
            }
          })
        }
        if (selectedSeats.length) {
          let price = 0;
          selectedSeats.map(x=>{
            let row=x.split("")[0];
            price = price + priceDetails[row]
          })
          
          return (
              <div className="paymentButtonContainer">
                <Button variant="contained" className="paymentButton" onClick={()=>{dispatch(updateSelectedSeats(selectedSeats));setTotalPrice(price);handleShow()}}>
                  Pay Rs.{price}
                </Button>
              </div>
          )
        } else {
          return <></>
        }
      }

      const onSeatClick = (seatValue, rowIndex, key) => {
        if (seatDetails) {
          if (seatValue === 1 || seatValue === 3) {
            return;
          } else if (seatValue === 0) {
            seatDetails[key][rowIndex] = 2; 
          } else {
            seatDetails[key][rowIndex] = 0; 
          }
        }
        setSeatDetails({...seatDetails});
      }
      
      const confirmBooking = async() => {
        try{
          handleClose();
          setIsLoading(true); 
          for (let key in seatDetails) {
            seatDetails[key] = seatDetails[key].map(value => (value === 2) ? 1 : value);
          }
          let showtimeIndex = movieDetails.SeatingOptions.findIndex(option => option.Time === selectedShow);
          for (const section in seatDetails) {
            if (seatDetails.hasOwnProperty(section) && movieDetails.SeatingOptions[showtimeIndex].Seats.hasOwnProperty(section)) {
              movieDetails.SeatingOptions[showtimeIndex].Seats[section] = seatDetails[section];
            }
          }
          let response = await axios.put(`/Movies/${movieDetails.id}`, movieDetails);
          setIsLoading(false); 
          
          showMessage("Succefully Booked your seats","success")
          // navigate("/")

        }catch(err){
          setIsLoading(false); 
          showMessage("There was an error while booking Movie","error")
        }
      }

    
    
    return(
        <>
            <div className="seatsContainer">
                <h1>{movieDetails?.Title}</h1>
                <br></br>
                <br></br>
                <div className="selectSeats">Please select seats for {
                 <span style={{margin:"0px 10px"}}> 
                  <Form.Select onChange={changeShow} value={selectedShow}>
                    {
                      movieDetails?.Shows?.map((x,idx)=>{
                          return ( <option key={idx} value={x}>{x}</option>)
                      })
                    }
                  </Form.Select>
                  </span>
                  } show</div>
                <br></br>
                {seatDetails && <RenderSeats />}
                <br></br><br></br>
                <img src={Image1} alt="" style={{width:"500px",height:"60px"}}/>
                <RenderPaymentButton />
                <Summary show={show} showMessage={showMessage} handleClose={handleClose} movieDetails={movieDetails} price={totalPrice} confirmBooking={confirmBooking}/>
            </div>
            <Loader isLoading={isLoading} />
            <Toaster showToast={showToast} setShowToast={setShowToast} message={message} type={type}/>
        </>
    )
}


export default Seats