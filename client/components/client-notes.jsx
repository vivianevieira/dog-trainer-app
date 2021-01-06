import React from 'react';

export default class ClientNotes extends React.Component {

  render() {
    return (
      <div className="row border border-1 roundex px-1 py-3 mb-4">
        <div className="row mb-4">
          <div className="col border-bottom pb-4">
            <div className="d-flex justify-content-end text-secondary">
              01/06/2020
            </div>
            <div>
              New notes entry. Client has made good progress today.
              Was able to socialize with other dogs without being pushy.
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col border-bottom pb-4">
            <div className="d-flex justify-content-end text-secondary">
              01/06/2020
            </div>
            <div>
              New notes entry. Client has made good progress today.
              Was able to socialize with other dogs without being pushy.
            </div>
          </div>
        </div>
      </div>
    );
  }

}
