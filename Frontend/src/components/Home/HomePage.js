import React from 'react';
import Title from './Title';
import VideoContent from './VideoContent';
import Features from './Features';

const HomePage = () => {
    return (
        <div className="row p-0 pb-0 pe-lg-0 pt-lg-5 align-items-center ">
            <Title />
            <VideoContent />
            <Features />
        </div>
    );
};

export default HomePage;