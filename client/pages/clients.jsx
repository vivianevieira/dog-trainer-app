import React from 'react';
import Navbar from './nav-bar';
import PageTitle from './page-title';

export default class Clients extends React.Component {

  render() {
    return (
      <div className="container container-margin">
        <div className="row">
          <div className="col-2">
            <Navbar />
          </div>
          <div className="col-8 page-margin-left">
            <div className="row">
              <PageTitle />
            </div>
            <div className="row content-cont">
              <div className="row justify-content-between clients-search-row">
                <div className="col-8">
                  <form>
                    <div className="input-group">
                      <input type="search" id="inputSearchClients" aria-describedby="" className="form-control form-control-underlined" placeholder="Search clients" name="" />
                        <button id="search-btn" type="submit" className="btn btn-link text-secondary" >
                          <i className="fa fa-search"></i>
                        </button>
                    </div>
                  </form>
                </div>
                <div className="col-4 text-end clients-search-row">
                  <button type="button" className="btn btn-outline-secondary add-new-btn">
                    Add new
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex clients-cont">
                  <div className="clients-pic-cont">
                    {/* Profile Picture */}
                  </div>
                  <div>
                    <div className="fs-6">
                      Loki
                    </div>
                    <div className="clients-text2 ">
                      Viviane Vieira
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
