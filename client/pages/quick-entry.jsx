import React from 'react';

export default class QuickEntry extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 align-self-center">
            <div className="">
              <h4 className="text-center heading">Create new entry</h4>
            </div>
      <form className="">
              <div className="mb-3">
                <label htmlFor="dogName" className="form-label label1">
          Dog's Name
        </label>
        <input
          required
          id="name"
          type="text"
          name="dogName"
          className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="owner" className="form-label">
            Owner's name
          </label>
          <input
            required
            id="owner"
            type="text"
            name="owner"
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="breed" className="form-label">
            Breed
          </label>
          <input
            id="breed"
            type="text"
            name="breed"
                  className="form-control" />
        </div>
        <div className="">
                <button type="submit" className="btn btn-primary mb-3">
            Save
          </button>
        </div>
      </form>
          </div>
        </div>
      </div>
    );
  }

}
