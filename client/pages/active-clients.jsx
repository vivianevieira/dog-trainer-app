import React from 'react';

function Client(props) {
  let $imagePreview = (<div className=""></div>);
  if (props.client.profilePhoto) {
    $imagePreview = (<img src={props.client.profilePhoto} alt="profile_pic" className="rounded-circle client-pic" width="50" height="50" />);
  }

  return (
    <div className="row">
      <div className="col d-flex clients-cont">
        <div className="clients-pic-cont rounded-circle me-3">
          {$imagePreview}
        </div>
        <div>
          <a
            href={`#client-details?clientId=${props.client.clientId}`}
            className="link-dark text-decoration-none">
            <div className="fs-6">
              {props.client.name}
            </div>
          </a>
          <div className="clients-text2 ">
            {props.client.owner1}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveList(props) {
  return (
    <>
      {
        props.clients.map(client => {
          return (
            <Client
              key={client.clientId}
              client={client} />
          );
        })
      }
    </>
  );
}

export default class ActiveClients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    fetch('/api/active')
      .then(response => response.json())
      .then(data => this.setState({ clients: data }));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h6 className="fw-bolder pb-2 mb-4 border-bottom border-1">Active Clients</h6>
        </div>
        <div className="row border rounded pt-3 pb-3 ps-2 pe-2">
          <div className="">
            <ActiveList clients={this.state.clients} />
          </div>
        </div>
      </div>
    );
  }
}
