
import './Footer.css';
import React from 'react';

export default function Footer() {
    return (
        <div>

            <div class="d-flex flex-column h-100">
                <footer class="w-100 py-4 mt-auto">
                    <div class="container py-4">
                        <div class="row gy-4 gx-5">
                            <div class="col-lg-4 col-md-6">
                                <h5 class="h1 text-white">E-Bus</h5>
                                <p class="small text-muted">Your search for best Bus Booking is here! Start your Journey with E-Bus and Book your Ride Today</p>
                                <p class="small text-muted mb-0">&copy; Copyrights. All rights reserved. <a class="text-primary" href="/">ebus.com</a></p>
                            </div>

                            <div class="col-lg-2 col-md-6">
                                <h5 class="text-white mb-3">Quick links</h5>
                                <ul class="list-unstyled text-muted">
                                    <li><a href="/">Home</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </footer>
            </div>


        </div>
    )
}
