import React from 'react';

export default class QuickEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      owner1: '',
      breed: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log('event.target.name', event.target.name)
    console.log('event.target.value', event.target.value)
    const {name, value} = event.target;
    this.setState({ [name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/clients', req)
      .then(res => res.json())
      .then(result => {
        this.setState(result)
      })
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 ">
            <div>
              <h4 className="text-center heading">
                Create new entry
                </h4>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label label1">
                  Dog's Name
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
                <label htmlFor="owner1" className="form-label">
                  Owner's name
                </label>
                <input
                  required
                  id="owner"
                  type="text"
                  name="owner1"
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  className="form-control" />
              </div>
              <div>
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
