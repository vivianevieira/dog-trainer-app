import React from 'react';

export default class ClientInputDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log('value', event.target.value)
    console.log('name', event.target.name)
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="row content-cont">
        <div className="row justify-content-between clients-search-row">
          <div className="col-8">
            Picture upload
          </div>
          <div className="col-4 text-end">
            Is active
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col">
            <form onSubmit="">
              <div className="mb-3">
                <label htmlFor="" className="form-label label1">
                  Name
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  name="name"
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
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div className="form-check">
                <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={this.handleChange}
                id="genderMale"
                value="male" />
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
                  value="female" />
                <label htmlFor="gender" className="form-check-label">
                  Female
                </label>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
