import React from 'react';

function Assessment(props) {
  const date = new Date(props.entry.assessmentDate);
  return (
    <div className="row">
      <div className="col">
        <div className="d-flex justify-content-end text-secondary">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(date)}
        </div>
        <div>
          {props.entry.assessmentEntry}
        </div>
      </div>
    </div>
  );
}

function AssessmentList(props) {
  return (
    <>
      {
        props.entries.map(entry => {
          return (
            < Assessment
              key={entry.assessmentId}
              entry={entry}/>
          );
        })
      }
     </>
  );
}

export default class ClientAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: [],
      newAssessment: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAssessments = this.getAssessments.bind(this);
  }

  componentDidMount() {
    this.getAssessments();
  }

  getAssessments() {
    fetch(`/api/assessment/${this.props.clientId}`)
      .then(res => res.json())
      .then(data => this.setState({ assessments: data }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ assessmentEntry: this.state.newAssessment })
    };
    fetch(`api/assessment/${this.props.clientId}`, req)
      .then(response => response.json())
      .then(result => {
        this.setState({
          newAssessment: '',
          assessments: this.state.assessments.concat(result)
        });
      });
  }

  handleChange(event) {
    this.setState({ newAssessment: event.target.value });
  }

  render() {
    return (
      <div className="row border border-1 rounded px-1 py-3 mb-4">
        <div className="row mb-4">
          <div className="col">
            Assessment
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <AssessmentList entries={this.state.assessments} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <textarea
                className="form-control mb-4"
                id="assessmentEntry"
                name="assessmentEntry"
                value={this.state.newAssessment}
                onChange={this.handleChange}
                placeholder="New entry"
                rows="4" />
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
