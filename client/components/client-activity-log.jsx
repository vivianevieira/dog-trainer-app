import React from 'react';
import ClientNav from './client-details-nav';

function Activity(props) {
  const date = new Date(props.activity.time_stamp);
  const array = props.activity.entry.split('.');
  let string = '';
  for (let i = 0; i < array.length; i++) {
    string = string.concat(array[i], '\n');
  }

  return (
    <div className="row mb-4">
      <div className="col border-bottom pb-4">
        <div className="d-flex justify-content-end text-secondary mb-2">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(date)}
        </div>
        <div className="line-break">
          {string}
        </div>
      </div>
    </div>
  );
}

function ActivityLogList(props) {
  return (
    <>
      {
        props.activityLog.map(entry => {
          return (
            <Activity
              key={entry.activityId}
              activity={entry} />
          );
        })
      }
    </>
  );
}

export default class ClientActivityLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityLog: [],
      leashwalking: '',
      distractions: '',
      packwalk: '',
      socialization: '',
      obedience: '',
      place: '',
      treadmill: '',
      crate: '',
      customActivity: ''
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
    this.state[name]
      ? this.setState({ [name]: '' })
      : this.setState({ [name]: value });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = this.state;
    const array = [];
    for (const prop in obj) {
      if (obj[prop] && typeof obj[prop] === 'string') {
        array.push(obj[prop]);
      }
    }
    const newEntry = array.join(' ');

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
        this.setState({
          activityLog: this.state.activityLog.concat(result),
          customActivity: '',
          distractions: '',
          leashwalking: '',
          obedience: '',
          packwalk: '',
          place: '',
          socialization: '',
          treadmill: '',
          crate: ''
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
          <ActivityLogList activityLog={this.state.activityLog} />
          <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="leashwalking"
                    name="leashwalking"
                    value="Walking properly on leash."
                    checked={this.state.leashwalking}
                    onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="leashwalking">
                    Walking properly on leash
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="distractions"
                    name="distractions"
                    value="Working around distractions."
                    checked={this.state.distractions}
                    onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="distractions">
                    Working around distractions
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="packwalk"
                    name="packwalk"
                    value="Pack walk."
                    checked={this.state.packwalk}
                    onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="packwalk">
                    Pack walk
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="socialization"
                    name="socialization"
                    value="Socialization/play time."
                    checked={this.state.socialization}
                    onChange={handleCheckBox}/>
                  <label className="form-check-label" htmlFor="socialization">
                    Socialization/play time
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="obedience"
                    name="obedience"
                    value="Basic obedience."
                    checked={this.state.obedience}
                    onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="obedience">
                    Basic obedience
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="place"
                    name="place"
                    value="Place board training."
                    checked={this.state.place}
                    onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="place">
                    Place board training
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="treadmill"
                    name="treadmill"
                    value="Treadmill."
                    checked={this.state.treadmill}
                    onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="treadmill">
                    Treadmill
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="crate"
                    name="crate"
                    value="Crate training."
                    checked={this.state.crate}
                    onChange={handleCheckBox} />
                  <label className="form-check-label" htmlFor="crate">
                    Crate training
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
