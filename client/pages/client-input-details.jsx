import React from 'react';

export default class ClientInputDetails extends React.Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSpayNeut = this.changeSpayNeut.bind(this);
    this.changeIsActive = this.changeIsActive.bind(this);
  }

  componentDidMount() {
    fetch(`api/clients/${this.props.clientId}`)
      .then(res => res.json())
      .then(client => this.setState(client));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const req = {
      method: 'PUT',
      body: formData
    };
    fetch(`api/clients/${this.props.clientId}`, req)
      .then(response => response.json())
      .then(result => {
        window.location.hash = '';
      });
  }

  changeSpayNeut() {
    if (this.state.spayNeut) {
      this.setState({ spayNeut: false });
    }
    if (!this.state.spayNeut) {
      this.setState({ spayNeut: true });
    }
  }

  changeIsActive() {
    if (this.state.isActive) {
      this.setState({ isActive: false });
    }
    if (!this.state.isActive) {
      this.setState({ isActive: true });
    }
  }

  render() {
    const client = this.state;
    let $imagePreview = (<div className=""></div>);
    if (client.profilePhoto) {
      $imagePreview = (<img src={client.profilePhoto} alt="profile_pic" className="rounded-circle client-pic" width="50" height="50" />);
    }

    return (
      <div className="row content-cont">
        <form onSubmit={this.handleSubmit}>
        <div className="row justify-content-between mb-4">
          <div className="col-8">
              <div className="clients-pic-cont rounded-circle mb-3">
                { $imagePreview }
            </div>
            <div className="mb-3">
              <label htmlFor="profilePhoto" className="form-label">Upload picture</label>
                <input type="file" name="profilePhoto" className="form-control form-control-sm" accept="image/png, image/jpeg"/>
            </div>
          </div>
          <div className="col-4 text-end">
            <div className="">
              <input
                className="form-check-input"
                type="checkbox"
                id="isActive"
                name="isActive"
                onChange={this.changeIsActive}
                checked={client.isActive === true} />
              <label className="form-check-label ms-2" htmlFor="isActive">
                Is active
              </label>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
              <div className="mb-3">
                <label htmlFor="" className="form-label label1">
                  Name
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  name="name"
                  value={client.name}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="owner1" className="form-label label1">
                  Owner 1
                </label>
                <input
                  required
                  id="owner1"
                  type="text"
                  name="owner1"
                  value={client.owner1}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="owner2" className="form-label label1">
                  Owner 2
                </label>
                <input
                  id="owner2"
                  type="text"
                  name="owner2"
                  value={client.owner2}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label label1">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={client.phone}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label label1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={client.email}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label label1">
                  DOB
                </label>
                <input
                  id="dob"
                  type="text"
                  name="dob"
                  value={client.dob}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="breed" className="form-label label1">
                  Breed
                </label>
                <input
                  id="breed"
                  type="text"
                  name="breed"
                  value={client.breed}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label label1">
                  Gender
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    onChange={this.handleChange}
                    id="genderMale"
                    value="Male"
                    checked={client.gender === 'Male'} />
                  <label htmlFor="gender" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    onChange={this.handleChange}
                    id="genderfemale"
                    value="Female"
                    checked={client.gender === 'Female'} />
                  <label htmlFor="gender" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="owned_since" className="form-label label1">
                  Owned since
                </label>
                <input
                  id="ownedSince"
                  type="text"
                  name="ownedSince"
                  value={client.ownedSince}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label label1">
                  Neutered/Spayed?
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="spayNeut"
                    onChange={this.changeSpayNeut}
                    id="spay_neut"
                    value="yes"
                    checked={client.spayNeut === true} />
                  <label htmlFor="spay_neut" className="form-check-label">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="spayNeut"
                    onChange={this.changeSpayNeut}
                    id="spay_neut2"
                    value="no"
                    checked={client.spayNeut === false} />
                  <label htmlFor="spay_neut" className="form-check-label">
                    No
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="vaccinated" className="form-label label1">
                  UTD on vaccines?
                </label>
                <input
                  id="vaccinated"
                  type="text"
                  name="vaccinated"
                  value={client.vaccinated}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="food_diet" className="form-label label1">
                  Follows a special diet?
                </label>
                <input
                  id="food_diet"
                  type="text"
                  name="foodDiet"
                  value={client.foodDiet}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="vet" className="form-label label1">
                  Vet&apos;s contact
                </label>
                <input
                  id="vet"
                  type="text"
                  name="vet"
                  value={client.vet}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="health" className="form-label label1">
                  Health issues
                </label>
                <input
                  id="health"
                  type="text"
                  name="health"
                  value={client.health}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="training" className="form-label label1">
                  Has had training before?
                </label>
                <input
                  id="training"
                  type="text"
                  name="training"
                  value={client.training}
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mb-3">
                  Save
                </button>
              </div>
          </div>
        </div>
        </form>
      </div>
    );
  }
}
