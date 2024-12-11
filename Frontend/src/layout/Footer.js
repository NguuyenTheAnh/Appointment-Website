import React from 'react';

const Footer = () => {
    return (
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 mt-5 border-top app-footer flex-nowrap">
            <div className="col mb-3 d-flex justify-content-center">

                <p className="text-body-secondary">© Bookla</p>
            </div>

            <div className="col mb-3">

            </div>

            <div className="col mb-3">
                <h5>About Bookla</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        Bookla is confident in <br />making your scheduling <br />more convenient.
                    </li>
                </ul>
            </div>

            <div className="col mb-3">
                <h5>Information</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="/" className="nav-link p-0 text-body-secondary">Home</a></li>
                    <li className="nav-item mb-2"><a href="/booking" className="nav-link p-0 text-body-secondary">Booking</a></li>
                    <li className="nav-item mb-2"><a href="/appointment" className="nav-link p-0 text-body-secondary">Appointment</a></li>
                </ul>
            </div>

            <div className="col mb-3">
                <h5>Get in touch </h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">+84385889511</li>
                    <li className="nav-item mb-2">anhnguyenthe2911@gmail.com</li>
                    <li className="nav-item mb-2">
                        <a href="https://www.facebook.com/profile.php?id=100078151025888" className="nav-link p-0 text-body-secondary">
                            FB: Nguyen Thế Anh
                        </a>
                    </li>

                </ul>
            </div>
        </footer>
    );
};

export default Footer;