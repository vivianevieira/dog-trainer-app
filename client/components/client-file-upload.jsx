import React from 'react';

function File(props) {
  const date = new Date(props.file.uploadDate);
  return (
      <div className="col mb-4">
        <div className="d-flex flex-row align-items-center">
          <i className="fas fa-paperclip paper-clip-icon"></i>
        <a href={props.file.fileUrl} className="text-decoration-none text-body">
            {props.file.fileTitle}
          </a>
        </div>
        <div className="text-secondary ms-4 smaller">
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(date)}
        </div>
      </div>
  );
}

function FileList(props) {
  return (
    <div className="row mb-4">
      {
        props.files.map(file => {
          return (
            < File
              key={file.fileId}
              file={file} />
          );
        })
      }
    </div>
  );
}

export default class ClientFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  componentDidMount() {
    this.getFiles();
  }

  getFiles() {
    fetch(`api/files/${this.props.clientId}`)
      .then(res => res.json())
      .then(data => this.setState({ files: data }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const req = {
      method: 'POST',
      body: formData
    };
    fetch(`api/files/${this.props.clientId}`, req)
      .then(response => response.json())
      .then(result => {
        this.setState({
          files: this.state.files.concat(result)
        });
      });
  }

  render() {
    return (
      <div className="row border border-1 rounded px-1 py-3 mb-4">
        <div className="row mb-4">
          <div className="col">
            Files
          </div>
        </div>
        <FileList files={this.state.files} />
        <div className="row mb-4">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fileName" className="col-form-label">File name</label>
                <input type="text" className="form-control" id="fileName" name="fileTitle" required/>
            </div>
            <div className="mb-4">
              <input className="form-control" type="file" name="file" required />
            </div>
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
