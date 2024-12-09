import React from 'react';

const Title = () => {
    return (
        <div className="col-lg-5 title">
            <div className='p-3 p-lg-5 pt-lg-3 title-content'>
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-5">Easy making an appointment</h1>
                <p className="lead">You can <b>quickly</b> make an appointment with your teachers.</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                    <button type="button" className="btn btn-dark btn-lg px-4 me-md-2 fw-bold mt-3">Get started. It's free</button>
                </div>
            </div>
        </div >
    );
};

export default Title;