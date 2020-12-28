import React from 'react';

export default class Navbar extends React.Component {
  render() {

    return (
      <div className="container nav-bar-container">
        <div className="row justify-content-start">
          <nav className="nav nav-pills flex-sm-column flex-row">
            <div className="nav-bar-icon-cont flex-fill">
              <a className="nav-link nav-bar-text" href="#">
                <div>
                  <i className="fas fa-home nav-bar-icon" />
                </div>
                <div>
                  Home
                </div>
              </a>
            </div>
            <div className="nav-bar-icon-cont flex-fill">
              <a className="nav-link nav-bar-text" href="#">
                <div>
                  <i className="far fa-calendar nav-bar-icon"></i>
                </div>
                Calendar
              </a>
            </div>
            <div className="nav-bar-icon-cont flex-fill">
              <a className="nav-link active nav-bar-text" aria-current="page" href="#">
                <div>
                  <i className="far fa-user-circle nav-bar-icon" />
                </div>
                Clients
              </a>
            </div>
            <div className="nav-bar-icon-cont flex-fill">
              <a className="nav-link nav-bar-text" href="#">
                <div>
                  <i className="far fa-heart nav-bar-icon" />
                </div>
                Active
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
