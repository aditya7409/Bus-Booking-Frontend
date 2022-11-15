import React from "react";
import NavigationBar from '../Pages/NavigationBar.js';
import './ViewSchedule.css';
import image1 from "../Pictures/bookings.gif";
import Swal from 'sweetalert2';
import axios from "axios";
import { useState } from "react";
import Footer from './Footer.js';
export default function ViewSchedule() {
  const user = localStorage.getItem('userId');
  const jwt = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('role');
  const [busDetails, setBusDetails] = useState([]);
  const [datafetched, setDataFetched] = useState(false);
  const findBus = (e) => {
    e.preventDefault();
    const busId=document.getElementById("busId").value;
    console.log(busId);
    axios.get(`http://localhost:8717/user-ms/users/viewSchedule/${busId}`
    ).then((res) => {
      var arr = new Array();
      const array = res.data.schedule;
      var count=1;
      array.forEach(element => {
        var obj = {
          id: count,
          stopName: element.stopName,
          time: element.time
        }
        arr.push(obj);
        count++;
      });
      setBusDetails(arr);
      setDataFetched(true);
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something Went Wrong',
      })
    })
  }

  return (
    <>
      {(user != null && jwt != null && role != null) ? <NavigationBar data="Dashboard" /> : <NavigationBar data="Log In" />}
      <div className="text-center " id="table">
      <h1 id="hding">Bus Schedule</h1>
        {(datafetched === true) ?
          <table className="table table-striped border border-1" >
            <thead>
              <tr>
                <th scope="col">Sl No.</th>
                <th scope="col">Stop Name</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody id="tab">
              {(datafetched) &&
                busDetails.map((data) => {
                  return (
                    <tr key={data.bookingId} className="px-2 py-2">
                      <td>{data.id}</td>
                      <td>{data.stopName}</td>
                      <td>{data.time}</td>
                    </tr>
                  )
                })

              }
            </tbody>
          </table> : <div className="text-center" id="busSchedule">
            <form onSubmit={findBus}>
              <label for="busId" id="label">Bus Id</label>
              <input type="number" id="busId" name="busId"/>
              <input type="submit" id="btnn" value="Find Schedule"/>
            </form>
          </div>
        }
        {/* {(datafetched === false) ? <img src={image1} class="" alt="Phone image" /> : <div></div>} */}
        <img src={image1} class="" alt="Phone image" /> 
      </div>
      
      <Footer/>
    </>
  )
}