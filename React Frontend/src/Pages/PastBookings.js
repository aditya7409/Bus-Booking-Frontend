import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from "../Pictures/empty.gif"
import image1 from "../Pictures/bookings.gif";
import 'reactjs-popup/dist/index.css';
import Footer from "./Footer.js";
import Loading from "./Loading"
import Swal from 'sweetalert2';
import NavigationBar from "./NavigationBar";
export default function PastBookings() {

    const [userId, setUserId] = useState('');
    const [jwtToken, setjwtToken] = useState('');
    const [bookings, setBookings] = useState([]);
    const [datafetched, setdatafetched] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const handleBookTicket = () => {
        navigate('/');
    }
    const handleUpcomingBookings = () => {
        navigate('/dashboard');
    }

    const handlelogout = () => {
        axios.get(`http://localhost:8717/user-ms/users/logout/${userId}`, {
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
            }
        }).then((res) => {
            if (res.status === 200) {
                localStorage.clear();
                Swal.fire({
                    icon: 'success',
                    title: 'We Will See you Soon',
                    text: 'Logged out Successfully',

                })
                navigate('/');
            }
        })
    }

    useEffect(() => {
        const user = localStorage.getItem('userId');
        const jwt = localStorage.getItem('jwtToken');
        setTimeout(() => setLoading(false), 1500)

        axios.get(`http://localhost:8717/user-ms/users/pastBookings/${user}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            }
        }
        ).then(res => {
            var arr = new Array();
            if (res.status === 200) {
                var details = res.data;
                var bookingId;
                var seatsBooked;
                var date;
                var stat;
                details.forEach((i) => {

                    bookingId = i.bookings.bookingId;
                    date = i.bookings.date;
                    seatsBooked = i.bookings.seatsBooked;
                    stat = i.bookings.status;
                    var tickets = i.tickets;
                    tickets.forEach((i) => {

                        var obj = {
                            bookingId: bookingId,
                            seatsBooked: seatsBooked,
                            date: date,
                            status: stat,
                            source: i.source,
                            destination: i.destination,
                            fare: i.fare,
                            passengerName: i.passengerName,
                            busId: i.busId,
                            seatNo: i.seatNo,
                        }
                        arr.push(obj);
                    })
                })
                setBookings(arr);
                setdatafetched(true);
            } else if (res.status === 204) {
                setBookings([]);
                setdatafetched(false);
            }
        }).catch((err) => {
            if (err.response.status == 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Please Login to Continue',

                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops!',
                    text: 'Something Went Wrong!',

                })
            }
            navigate("/")
        })
        setUserId(user);
        setjwtToken(jwt);
    }, []);

    return (
        <>
            <NavigationBar data="Dashboard"/>
            {loading == false ? (


                <div className="text-center " id="table">
                    <div className="row mt-3" id="dashboard">
                        <div className="col-4 ">
                            <div className="text-start" id="bookTicket">
                                <button type="button" className="btn btn-success" onClick={handleBookTicket}>
                                    Book Ticket
                                </button>
                            </div>
                        </div>
                        <div className="col-4 ">
                            <div className="text-mid" id="upcomingBookings">
                                <button type="button" className="btn btn-info" onClick={handleUpcomingBookings}>
                                    Upcoming Bookings
                                </button>
                            </div>
                        </div>
                        <div className="col-4 ">
                            <div className="text-end" id="logout">
                                <button type="button" className="btn btn-danger" onClick={handlelogout}>
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-center my-3">My PastBookings</h2>
                    {(datafetched === true) ?
                        <table className="table table-striped border border-1" >
                            <thead>
                                <tr>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">Source</th>
                                    <th scope="col">Destination</th>
                                    <th scope="col">Passenger Name</th>
                                    <th scope="col">Seat No</th>
                                    <th scope="col">Bus Id</th>
                                    <th scope="col">Fare</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody id="tab">
                                {(datafetched) &&
                                    bookings.map((data) => {
                                        return (
                                            <tr key={data.bookingId} className="px-2 py-2">
                                                <td>{data.bookingId}</td>
                                                <td>{data.source}</td>
                                                <td>{data.destination}</td>
                                                <td>{data.passengerName}</td>
                                                <td>{data.seatNo}</td>
                                                <td>{data.busId}</td>
                                                <td>{data.fare}</td>
                                                <td>{data.date}</td>
                                                {<td><Button className="btn btn-warning" disabled="true"> Cancellation Time Over </Button></td>
                                                    
                                                }

                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </table> : <img src={image} class="img-fluid" alt="Phone image" />
                    }
                    {(datafetched === true) ? <img src={image1} class="" alt="Phone image" /> : <div></div>}

                </div>
            ) : (<Loading />)}
            <Footer />
        </>
    )
}
