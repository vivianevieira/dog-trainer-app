import React from 'react';
import ClientNav from './client-details-nav';

export default class ClientActivityLog extends React.Component {

  render() {
    return (
      <>
        <div className="row">
          <ClientNav />
        </div>
        <div className="row justify-content-center border border-1 roundex px-1 py-3 mb-4">
          <div className="row mb-4">
            <div className="col">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="leashwalking"/>
                <label className="form-check-label" htmlFor="leashwalking">
                  Walking properly on leash
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="distractions" />
                <label className="form-check-label" htmlFor="distractions">
                  Working around distractions
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="packwalk" />
                <label className="form-check-label" htmlFor="packwalk">
                  Pack walk
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="socialization" />
                <label className="form-check-label" htmlFor="socialization">
                  Socialization/play time
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="obedience" />
                <label className="form-check-label" htmlFor="obedience">
                  Basic obedience
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="place" />
                <label className="form-check-label" htmlFor="place">
                  Place board training
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="treadmill" />
                <label className="form-check-label" htmlFor="treadmill">
                  Treadmill
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <form>
            <textarea
              className="form-control mb-4"
              name="entry"
              // value={}
              // onChange={}
              placeholder="Custom activities"
              rows="4" />
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
