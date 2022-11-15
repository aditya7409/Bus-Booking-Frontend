import React,{useState} from 'react';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function NewTicket(props){
    
    const [isShow, invokeModal] = React.useState(true);
    
    const [passengerNames,setPassengerNames] = useState("");
    const navigate = useNavigate();
    const initModal = () => {
        return invokeModal(!isShow)
    }

    const handleSubmit = async(e) => {
        const userId = localStorage.getItem("userId");
        const jwttoken = localStorage.getItem("jwtToken");
        const pname= passengerNames;
        var arr=new Array();
        arr=pname.split(',');
        const formData  = {
            "busId" : props.bus_id,
            "passengerNames" : arr,
            "source":props.src,
            "destination":props.dest,
            "userId":userId
        }
       
        await axios.post(`http://localhost:8717/user-ms/users/bookTicket`,
                formData,{
                    headers :{
                        "Authorization" : `Bearer ${jwttoken}`,
                    }
                    }
                ).then((res) =>{
                  console.log(res.data);
                    if(res.status === 200){
                      Swal.fire({
                        icon: 'success',
                        title: 'Booked Successfully',
                        text: `${res.data.message}`,
                      })
                      
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
        props.handleClick();
        e.preventDefault();
    }

    return(
          <>
          
      <Modal show={props.handleClick} className=" modal-lg" >
        <Modal.Header closeButton onClick={props.handleClick}>
          <Modal.Title>Add Passenger Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
                    <div className="form-outline mb-3">
                        <label className="form-label" >
                            Passenger Names
                        </label>
                      <textarea
                        id="passengerNames"
                        className="form-control form-control-lg"
                        value={passengerNames}
                        rows="5"
                        placeholder="Enter Passenger Names Seperated by , "
                        onChange = {(e) => setPassengerNames(e.target.value) }
                        required
                      />
                      
                    </div>                    
      </form>
                  
        </Modal.Body>
        <Modal.Footer>
          <p>{props.policy_id}</p>
          <Button variant="danger" onClick={props.handleClick}>
            Close
          </Button>
          <Button className="btn-primary" onClick={handleSubmit}>
            Book
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
    )
}