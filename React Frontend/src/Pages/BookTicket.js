
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
function BookTicket(props) {
  const [isShow, invokeModal] = React.useState(true);
  const [passengerName,setPassengerName] = useState('');
  const [source,setSource] = useState('');
  const [destination,setdestination] = useState(''); 
  const navigate = useNavigate();

  const   handleSubmit = async(e) =>{
    const userId = localStorage.getItem("userId");
    const jwttoken = localStorage.getItem("jwtToken");
    var passengerNames = new Array();
    passengerNames = passengerName.split(',');
    
    const formData = {
        "busId" : props.busId,
        "passengerNames" : passengerNames,
        "source" : source,
        "destination" : destination,
        "userId" : userId,
    };
    await axios.post(`http://localhost:8717/user-ms/users/bookTicket`,
        formData,{
            headers :{
                "Authorization" : `Bearer ${jwttoken}`,
            }
        }
    ).then((res) =>{
        if(res.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Tickets Booked Successfully',
            text: `${res.data.Body}`,
          })
           navigate('/');
        }
    }).catch((err) =>{
      if(err.response.status === 401){
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Please Login to Continue',
  
        })
          
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something Went Wrong!',
  
        })
      }
      navigate('/');
  })
    e.preventDefault();
  }

  const initModal = () => {
    return invokeModal(!isShow)
  }
  return (
    <>
      <Modal show={props.handleClick} className=" modal-lg" >
        <Modal.Header closeButton onClick={props.handleClick}>
          <Modal.Title>Book Tickets Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
                    <div className="form-outline mb-3">
                    <label className="form-label" for="form3Example1cg">
                        Passenger Names
                      </label>
                      <input type="text" id="passengerName" className="form-control form-control-lg" value={passengerNames} onChange = {(e) => setPaseengerNames(e.target.value) }required/>
                    </div>
                    <div className="form-outline mb-3">
                    <label className="form-label" for="form3Example1cg">
                        Source
                      </label>
                      <input type="text" id="source" className="form-control form-control-lg" value={source} onChange = {(e) => setSource(e.target.value) }required/>
                    </div>
                    <div className="form-outline mb-3">
                    <label className="form-label" for="form3Example1cg">
                        Destination
                      </label>
                      <input type="text" id="destination" className="form-control form-control-lg" value={destination} onChange = {(e) => setdestination(e.target.value) }required/>
                    </div>           
                  </form>
                  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleClick}>
            Close
          </Button>
          <Button className="btn-primary" onClick={handleSubmit}>
            Submit
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default BookTicket;