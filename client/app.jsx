import React from 'react';
import QuickEntry from './pages/quick-entry';
import Navbar from './components/nav-bar';
import PageTitle from './components/page-title';
import PageContainer from './components/page-container';
import Clients from './pages/clients';
import parseRoute from './lib/parse-route';
import ClientInputDetails from './pages/client-input-details';
import ClientDetails from './pages/client-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Clients />;
    }
    if (path === 'client-entry') {
      return <QuickEntry />;
    }
    if (path === 'clients') {
      const clientId = this.state.route.params.get('clientId');
      return <ClientInputDetails clientId={clientId} />;
    }
    if (path === 'client-details') {
      const clientId = this.state.route.params.get('clientId');
      return <ClientDetails clientId={clientId}/>;
    }
  }

  render() {
    return (
    <div className="container container-margin">
      <div className="row page-cont">
        <div className="col-sm-2 left-nav">
          <Navbar />
        </div>
        <div className="col-sm-8">
          <div className="row">
            <PageTitle />
          </div>
          <PageContainer>
            { this.renderPage() }
          </PageContainer>
        </div>
      </div>
      <div className="row bottom-nav">
        <Navbar />
    </div>
    </div>
    );
  }
}
