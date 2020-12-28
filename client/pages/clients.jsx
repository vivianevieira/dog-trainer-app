import React from 'react';

function Client(props) {
  return (
    <div className="row">
    <div className="col d-flex clients-cont">
    <div className="clients-pic-cont">
      {/* Profile Picture */}
    </div>
    <div>
      <div className="fs-6">
        {props.client.name}
      </div>
      <div className="clients-text2 ">
        {props.client.owner1}
      </div>
    </div>
    </div>
    </div>
  );
}

function ClientList(props) {
  return (
    <>
      {
        props.clients.map(client => {
          return (
            < Client
               key={client.clientId}
               client={client}/>
          );
        })
      }
    </>
  );
}

export default class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      search: ''
    };
    this.getAllClients = this.getAllClients.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAllClients();
  }

  getAllClients() {
    fetch('/api/clients')
      .then(response => response.json())
      .then(data => this.setState({ clients: data }));
  }

  handleChange(e) {
    this.setState({
      search: event.target.value
    });
  }

  render() {
    const fileteredClients =
      this.state.clients.filter(client => {
        return client.name.toLowerCase().includes(this.state.search.toLowerCase());
      });

    return (
            <div className="row content-cont">
              <div className="row justify-content-between clients-search-row">
                <div className="col-8">
                  <form>
                    <div className="input-group">
                      <input
                        type="search"
                        id="inputSearchClients"
                        aria-describedby=""
                        className="form-control form-control-underlined"
                        placeholder="Search clients"
                        name=""
                        onChange={this.handleChange} />
                        <span className="text-secondary search-icon" >
                          <i className="fa fa-search"></i>
                        </span>
                    </div>
                  </form>
                </div>
                <div className="col-4 text-end clients-search-row">
                  <a href="#client-entry" className="btn btn-outline-secondary add-new-btn">Add new</a>
                </div>
              </div>
              <ClientList clients={fileteredClients} />
          </div>
    );
  }
}
