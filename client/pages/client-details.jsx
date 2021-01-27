import React from 'react';
import ClientAssessment from '../components/client-assessment';
import ClientFileUpload from '../components/client-file-upload';
import ClientNav from '../components/client-details-nav';

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
    if (client.profilePhoto) {
      $imagePreview = (<img src={client.profilePhoto} alt="profile_pic" className="rounded-circle client-pic" width="50" height="50" />);
    }

    let age = 0;
    let months = 0;
    if (client.dob) {
      const today = new Date();
      const birthDate = new Date(client.dob);
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      months = m;
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (m < 0) {
        months = (12 - birthDate.getMonth()) + today.getMonth();
      }
    }

    return (
      <>
      <div className="row">
        <ClientNav />
      </div>
      <div className="row border border-1 rounded px-1 py-3 mb-4">
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
            <a href={`#clients?clientId=${this.props.clientId}`} className="btn btn-outline-secondary add-new-btn">Edit</a>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-secondary">Owner 1</td>
                  <td>{client.owner1}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Owner 2</td>
                  <td>{client.owner2}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Phone</td>
                  <td>
                    <a href={`tel:1-${client.phone}`} className="link-dark text-decoration-none">
                      {client.phone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">Email</td>
                  <td>
                    <a href={`mailto:${client.email}`} className="link-dark text-decoration-none">
                      {client.email}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-secondary">DOB</td>
                  <td>{client.dob}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Age</td>
                  <td>{age}y {months}m</td>
                </tr>
                <tr>
                  <td className="text-secondary">Breed</td>
                  <td>{client.breed}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Gender</td>
                  <td>{client.gender}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-secondary">Owned since</td>
                  <td>{client.ownedSince}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Neutered/Spayed?</td>
                  <td>{client.spayNeut}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-secondary">UTD on vaccines?</td>
                  <td>{client.vaccinated}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Special dietary requirements</td>
                  <td>{client.foodDiet}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-secondary">Vet’s contact</td>
                  <td>{client.vet}</td>
                </tr>
                <tr>
                  <td className="text-secondary">Health issues</td>
                  <td>{client.health}</td>
                </tr>
                <tr>
                  <td className="text-secondary">List any prior training experience</td>
                  <td>{client.training}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <ClientAssessment clientId={this.props.clientId} />
        <ClientFileUpload clientId={this.props.clientId}/>
      </>
    );
  }
}
