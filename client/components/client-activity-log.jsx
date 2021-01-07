import React from 'react';
import ClientNav from './client-details-nav';

export default class ClientActivityLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityLog: [],
      customActivity: '',
      distractions: null,
      leashwalking: null,
      obedience: null,
      packwalk: null,
      place: null,
      socialization: null,
      treadmill: null,
      newEntry: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  componentDidMount() {
    fetch(`api/activitylog/${this.props.clientId}`)
      .then(res => res.json())
      .then(data => this.setState({ activityLog: data }));
  }

  handleCheckBox(event) {
    const { name, value } = event.target;
    this.state.[name]
      ? this.setState({ [name]: null })
      : this.setState({ [name]: value });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { customActivity, distractions, leashwalking, obedience, packwalk, place, socialization, treadmill } = this.state;
    const newEntry = `${customActivity}
    ${distractions}
    ${leashwalking}
    ${obedience}
    ${packwalk}
    ${place}
    ${socialization}
    ${treadmill}`;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entry: newEntry })
    };
    fetch(`api/activitylog/${this.props.clientId}`, req)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        this.setState({
          customActivity: ''
        });
      });
  }

  render() {
    const { customActivity } = this.state;
    const { handleChange, handleSubmit, handleCheckBox } = this;
    return (
      <>
        <div className="row">
          <ClientNav />
        </div>
        <div className="row justify-content-center border border-1 roundex px-1 py-3 mb-4">
          <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="leashwalking" name="leashwalking" value="Walking properly on leash." onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="leashwalking">
                    Walking properly on leash
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="distractions" name="distractions" value="Working around distractions." onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="distractions">
                    Working around distractions
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="packwalk" name="packwalk" value="Pack walk." onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="packwalk">
                    Pack walk
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="socialization" name="socialization" value="Socialization/play time." onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="socialization">
                    Socialization/play time
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="obedience" name="obedience" value="Basic obedience." onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="obedience">
                    Basic obedience
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="place" name="place" value="Place board training." onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="place">
                    Place board training
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="treadmill" name="treadmill" value="Treadmill." onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="treadmill">
                    Treadmill
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <textarea
                className="form-control mb-4"
                name="customActivity"
                value={customActivity}
                onChange={handleChange}
                placeholder="Custom activities"
                rows="4" />
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
          </div>
        </div>
      </>
    );
  }
}
