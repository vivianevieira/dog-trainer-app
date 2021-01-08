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
    </div>
  );
}

export default WelcomePage;
