import React from 'react';
import videoHomePage from '../../assets/Booking.mp4';


const HomePage = () => {
    return (
        <div className="row p-0 pb-0 pe-lg-0 pt-lg-5 align-items-center ">

            {/**Title */}
            <div className="col-lg-5 p-3 p-lg-5 pt-lg-3 title">
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-5">Easy making an appointment</h1>
                <p className="lead">You can <b>quickly</b> make an appointment with your teachers.</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <button type="button" className="btn btn-dark btn-lg px-4 me-md-2 fw-bold mt-3">Get started. It's free</button>
                </div>
            </div>

            {/**Video */}
            <div className="col-lg-6 offset-lg-1 p-0 overflow-hidden shadow-lg rounded-3">
                <video loop autoPlay muted width="100%" >
                    <source
                        src={videoHomePage}
                        type="video/mp4"
                    />
                </video>
            </div>

            {/**Features */}
            <div className="container  px-5 py-5 shadow-sm features">
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="col d-flex align-items-start justify-content-center">
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30"
                                fill="currentColor"
                                className="bi bi-check2-circle"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"
                                />
                                <path
                                    d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Easy to use.</h3>
                            <p>So easy to use.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start justify-content-center">
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30"
                                fill="currentColor"
                                className="bi bi-mortarboard"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z"
                                />
                                <path
                                    d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Satisfied.</h3>
                            <p>Fast and Convenient.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start justify-content-center">
                        <div
                            className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="30"
                                fill="currentColor"
                                className="bi bi-arrow-through-heart"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a21.86 21.86 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354l-1.5 1.5Zm2.893-4.894A20.419 20.419 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512.679-1.34.607-2.42.215-3.185-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761-.392.766-.464 1.845.215 3.185.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708L5.747 10.96Z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="fs-2 text-body-emphasis">Guaranteed to work.</h3>
                            <p>Can make an appointment.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/**Footer */}
            <div className="container footer">
                <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 border-top">
                    <div className="col mb-3 d-flex justify-content-center">

                        <p className="text-body-secondary">© Bookla</p>
                    </div>

                    <div className="col mb-3">

                    </div>

                    <div className="col mb-3">
                        <h5>Information</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5>About Bookla</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5>Bookla</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;