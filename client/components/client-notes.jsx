import React from 'react';

function Note(props) {
  const date = new Date(props.note.time_stamp);
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
        <div>
          {props.note.entry}
        </div>
      </div>
    </div>
  );
}

function NotesList(props) {
  return (
    <>
      {
        props.notes.map(entry => {
          return (
            < Note
              key={entry.noteId}
              note={entry} />
          );
        })
      }
    </>
  );
}

export default class ClientNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote: ''
    };
    this.getNotes = this.getNotes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    fetch(`/api/notes/${this.props.clientId}`)
      .then(res => res.json())
      .then(data => this.setState({ notes: data }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entry: this.state.newNote })
    };
    fetch(`api/notes/${this.props.clientId}`, req)
      .then(response => response.json())
      .then(result => {
        this.setState({
          newNote: '',
          notes: this.state.notes.concat(result)
        });
      });
  }

  handleChange(event) {
    this.setState({ newNote: event.target.value });
  }

  render() {
    return (
      <div className="row justify-content-center border border-1 roundex px-1 py-3 mb-4">
        <NotesList notes={this.state.notes} />
        <div className="row mb-4">
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="form-control mb-4"
              id="entry"
              name="entry"
              value={this.state.newNote}
              onChange={this.handleChange}
              placeholder="Add new note"
              rows="4" />
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
