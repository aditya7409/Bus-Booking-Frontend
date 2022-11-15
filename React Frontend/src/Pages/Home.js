import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Home.css';
import Footer from './Footer';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import image from '../Pictures/bus.png';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Button } from "react-bootstrap";
import NewTicket from './NewTicket.js';
import { useNavigate } from "react-router-dom";
import NavigationBar from '../Pages/NavigationBar.js';
export default function Home() {
  const user = localStorage.getItem('userId');
  const jwt = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('role');
  const [source, setsource] = useState('');
  const [destination, setdestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [datafetched, setdatafetched] = useState(false);
  const [buses, setbuses] = useState([]);
  const [popupticket, setpopupticket] = useState(false);
  const [busId, setbusId] = useState(null);

  const navigate = useNavigate();
  
  const handleBookTicket = () => {
    console.log(localStorage.getItem("userId"));
    if(localStorage.getItem("userId")==null || localStorage.getItem("jwtToken"==null)){
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Login to Book Ticket',
      })
      navigate("/Login");
    }else{
      setpopupticket(!popupticket);
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      "source": source,
      "destination": destination,
      "date": startDate.toISOString().slice(0, 10)
    };
    
    await axios.post(`http://localhost:8717/user-ms/users/findBus`,
      formData, {

    }
    ).then((res) => {
      if (res.status === 200) {
        var allBuses=new Array();
        const bus=(res.data.busList)
        bus.forEach((index)=>{
          var stops=index.route;
          var stopsTime=index.timings;
          var arr=new Array();
          var arr2=new Array();
          arr=stops.split(',');
          arr2=stopsTime.split(',');
          var indx,indx2;
          for( var i=0;i<arr.length;i++){
            if(arr[i]===source){
              indx=i;
              break;
            }
          }
          for( var i=0;i<arr.length;i++){
            if(arr[i]===destination){
              indx2=i;
              break;
            }
          }
          var srcTime=arr2[indx];
          var destTime=arr2[indx2];
          let obj={
            busId:index.busId,
            busName:index.busName,
            totalSeats:index.totalSeats,
            availableSeats:index.availableSeats,
            source:source,
            srcTime:srcTime,
            destination:destination,
            destTime:destTime,
            date:index.date
          }
          allBuses.push(obj);
        });
        // console.log(res.data.busList);
        // console.log(allBuses);
        setbuses(allBuses);
        setdatafetched(true);
      }else{
        if(res.status===204){
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'No Bus Found',
  
          })
        }
      }
    }).catch((err) => {
      if (err.response.status === 204) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'No Bus Found',

        })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something Went Wrong!',

        })
      }
    })
  }
  return (
    <>
      {
        (popupticket) && <NewTicket handleClick={handleBookTicket} bus_id={busId} src={source} dest={destination}/>
      }
      {
       (user!=null && jwt!=null && role!=null) ?<NavigationBar data="Dashboard"/>:<NavigationBar data="Log In"/>
      }
      <div id='searchBus'>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <div id="src">
                <p><span>
                  <select id="source" name="source" value={source} onChange={(e) => setsource(e.target.value)}>
                    <option value="">FROM</option>
                    <option value="Asansol">Asansol</option>
                    <option value="Durgapur">Durgapur</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                </span></p>
              </div>
            </Col>
            <Col> 
              <div id="dest">
                <p><span>
                  <select id="destination" name="destination" value={destination} onChange={(e) => setdestination(e.target.value)} >
                    <option value="">TO</option>
                    <option value="Asansol">Asansol</option>
                    <option value="Durgapur">Durgapur</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                </span></p>
              </div>
            </Col>
            <Col>
              <div id="traveldate">
                <DatePicker id="trvldate"
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </Col>
            <Col >
              <button id="btn" type='submit'>Search Buses</button>
            </Col>
          </Row>
        </form>
      </div>
      {(buses!=null && buses.length != 0) ?
        <div className="text-center " id="table">
          <h2 className="text-center my-3">Available Buses</h2>
          <table className="table table-striped border border-1">
            <thead>
              <tr>
                <th scope="col">Bus Name</th>
                <th scope="col">Total Seats</th>
                <th scope="col">Available Seats</th>
                <th scope="col">Source</th>
                <th scope="col">Source Time</th>
                <th scope="col">Destination</th>
                <th scope="col">Destination Time</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {(datafetched) &&
                buses.map((data) => {
                  return (
                    <tr key={data.policyId} className="px-2 py-2" >
                      <td>{data.busName}</td>
                      <td>{data.totalSeats}</td>
                      <td>{data.availableSeats}</td>
                      <td>{data.source}</td>
                      <td>{data.srcTime}</td>
                      <td>{data.destination}</td>
                      <td>{data.destTime}</td>
                      <td>{data.date}</td>
                      {(data.availableSeats != 0) ? <td><Button className="btn btn-success" onClick={() => {
                        setbusId(data.busId);
                        handleBookTicket()
                      }} > Book Tickets </Button></td>
                        :
                        <td><Button className="btn btn-warning" disabled="true" > No Seats Available </Button></td>
                      }

                    </tr>
                  )
                })

              }
            </tbody>
          </table>
        </div>
        : <div></div>}

      <div>
        <div>
          <div class="bg-light">
            <div class="container py-5">
              <div class="row h-100 align-items-center py-5">
                <div class="col-lg-6">
                  <h1 class="display-4">E-BUS</h1>
                  <p class="lead text-muted mb-0">Find most amazing deals on Bus.Just Book your Seat & enjoy hassle free Ride</p>
                </div>
              </div>
              <div class="col-lg-6 d-none d-lg-block"></div>
            </div>
          </div>
        </div>

        <div class="bg-white py-5">
          <div class="container py-5">
            <div class="row align-items-center mb-5">
              <div class="col-lg-6 order-2 order-lg-1"><i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                <h1 class="font-weight-light">We Promise to Deliver</h1>
                <h3>Unmatched Benefits</h3>
                <p class="font-italic text-muted mb-4">We take care of your travel beyond ticketing by providing you with innovative and unique benefits-The Reason for 1M+ Bookings</p>
              </div>
              <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src={image} alt="" class="img-fluid mb-4 mb-lg-0" /></div>
            </div>
            <div class="row align-items-center">
              <div class="col-lg-5 px-5 mx-auto"><img src="https://pbs.twimg.com/media/DtLfZEjWoAE8gfB.jpg" alt="" class="img-fluid mb-4 mb-lg-0" /></div>
              <div class="col-lg-6"><i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
                <h2 class="font-weight-light">24 x 7 Customer Support</h2>
                <p class="font-italic text-muted mb-4">Our support representatives interact with customers on a variety of channels such as phone, email, and social media, and ensure that all valid customer concerns are being dealt with immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-light py-5">
          <div class="container py-5">
            <div class="row mb-4">
              <div class="col-lg-5">
                <h2 class="display-4 font-weight-light">Developer</h2>
              </div>
            </div>

            <div class="row text-center">
              <div class="col-xl-3 col-sm-6 mb-5">
                <div class="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                  <h5 class="mb-0">Aditya Sinha</h5>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}