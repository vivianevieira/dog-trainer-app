import React from 'react';

export default class ClientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: '',
      profilePhoto: '',
      name: '',
      owner1: '',
      owner2: '',
      phone: '',
      email: '',
      breed: '',
      dob: '',
      gender: '',
      ownedSince: '',
      spayNeut: '',
      vaccinated: '',
      foodDiet: '',
      vet: '',
      health: '',
      training: ''
    };
  }

  componentDidMount() {
    fetch(`api/clients/${this.props.clientId}`)
      .then(res => res.json())
      .then(client => this.setState(client));
  }

  render() {
    const client = this.state;
    let $imagePreview = (<div className=""></div>);
    if (client.profilePhoto !== '' | client.profilePhoto !== null) {
      $imagePreview = (<img src={client.profilePhoto} alt="profile_pic" className="rounded-circle client-pic" width="50" height="50" />);
    }

    return (
      <div className="row border border-1 rounded px-1 py-3">
        <div className="row justify-content-between mb-4">
          <div className="col-8 d-flex align-items-center">
            <div className="clients-pic-cont rounded-circle me-3">
              {$imagePreview}
            </div>
            <div className="">
              {client.name}
            </div>
          </div>
          <div className="col-4 text-end pe-0">
            <a href="#clients" className="btn btn-outline-secondary add-new-btn">Edit</a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Owner 1</td>
                  <td>Viviane V.</td>
                </tr>
                <tr>
                  <td>Owner 2</td>
                  <td>Keith. G</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>760-846-3348</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>viviane.kodama@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>DOB</td>
                  <td>04/01/2019</td>
                </tr>
                <tr>
                  <td>Breed</td>
                  <td>Australian Cattle Dog</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>Male</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );

  }

}
