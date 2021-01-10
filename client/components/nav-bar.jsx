import React from 'react';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  render() {
    const { route } = this.context;
    const path = route.path;
    const homeLinkClass = path === ''
      ? 'nav-link active nav-bar-text'
      : 'nav-link nav-bar-text';
    const clientsLinkClass = path === 'client-details' || path === 'clients' ||
      path === 'client-activ-log' || path === 'client-notes' || path === 'client-list' ||
      path === 'client-entry'
      ? 'nav-link active nav-bar-text'
      : 'nav-link nav-bar-text';
    const activeLinkClass = path === 'active'
      ? 'nav-link active nav-bar-text'
      : 'nav-link nav-bar-text';

    return (
      <div className="container nav-bar-container">
        <div className="row justify-content-start">
          <nav className="nav nav-pills flex-sm-column flex-row">
            <div className="nav-bar-icon-cont flex-fill">
              <a className={homeLinkClass} href="#">
                <div>
                  <i className="fas fa-home nav-bar-icon" />
                </div>
                <div>
                  Home
                </div>
              </a>
            </div>
            <div className="nav-bar-icon-cont flex-fill">
              <a className={clientsLinkClass} href="#client-list">
                <div>
                  <i className="far fa-user-circle nav-bar-icon" />
                </div>
                Clients
              </a>
            </div>
            <div className="nav-bar-icon-cont flex-fill">
              <a className={activeLinkClass} href="#active">
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
Navbar.contextType = AppContext;
