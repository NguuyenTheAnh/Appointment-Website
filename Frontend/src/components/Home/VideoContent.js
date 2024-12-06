import React from 'react';
import videoHomePage from '../../assets/videos/Booking.mp4';
const VideoContent = () => {
    return (
        <div className="col-lg-6 offset-lg-1 p-0 overflow-hidden shadow-lg rounded-3">
            <video loop autoPlay muted width="100%" >
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default VideoContent;