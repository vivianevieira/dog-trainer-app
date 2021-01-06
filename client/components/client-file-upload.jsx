import React from 'react';

export default class ClientFileUpload extends React.Component {

  render() {
    return (
      <div className="row border border-1 rounded px-1 py-3 mb-4">
        <div className="row mb-4">
          <div className="col">
            Files
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <div className="d-flex flex-row align-items-center">
              <i className="fas fa-paperclip paper-clip-icon"></i>
              Vaccination records
             </div>
            <div className="text-secondary ms-4 smaller">
              file-1609892437142.pdf
            </div>
            <div className="text-secondary ms-4 smaller">
              01/04/2020
            </div>
          </div>
          <div className="col">
            <div>
              <i className="fas fa-paperclip paper-clip-icon"></i>
            </div>
            Doc2
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <form>
            <div className="mb-3">
              <label htmlFor="fileName" className="col-form-label">File name</label>
              <input type="text" className="form-control" id="fileName" />
            </div>
            <div className="mb-4">
              <input className="form-control" type="file" />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
