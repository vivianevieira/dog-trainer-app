import React from 'react';

function WelcomePage() {
  return (
    <div className="container mt-5">
      <div className="text-center mt-4">
        <img src="https://dogtrainercrm-profilepictures.s3.us-east-2.amazonaws.com/dogNet-logo-sm.png"
          className="img-fluid mb-2"
          alt="dogNet logo" />
      </div>
      <div className="">
        <p className="welcome-title fs-6 text-center">Custom CRM for dog trainers</p>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 col-lg-4 col-sm mb-2">
          <i className="fas fa-graduation-cap mb-2"></i>
          <p>DogNet is a Customer Relationship Management tool for dog trainers
            built as a final project while attending a full stack web development
            bootcamp at LearningFuze.</p>
        </div>
        <div className="col-md-6 col-lg-4 col-sm">
          <i className="fas fa-users mb-2"></i>
          <p>The goal was to create a solution to allow users to
             conveniently enter and access key information about their clients.</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
