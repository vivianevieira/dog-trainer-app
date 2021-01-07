import React from 'react';
import AppContext from '../lib/app-context';

function ActiveLink(props) {
  const className = props.isActive
    ? 'nav-link border-1 border-bottom border-primary'
    : 'nav-link link-dark';
  return (
    <a className={className} href={props.href}>
      { props.children}
    </a>
  );
}

export default class ClientNav extends React.Component {

  render() {
    const { route } = this.context;
    const path = route.path;
    const clientId = route.params.get('clientId');
    return (
        <ul className="nav nav-fill border-1 border-bottom mb-4">
          <li className="nav-item">
            <ActiveLink isActive={path === 'client-details' || path === 'clients'} href={`#client-details?clientId=${clientId}`}>
              Details
            </ActiveLink>
          </li>
          <li className="nav-item">
            <ActiveLink isActive={path === 'client-notes'} href={`#client-notes?clientId=${clientId}`}>
              Notes
            </ActiveLink>
          </li>
          <li className="nav-item">
            <ActiveLink isActive={path === 'client-activ-log'} href={`#client-activ-log?clientId=${clientId}`}>
              Activity log
            </ActiveLink>
          </li>
        </ul>
    );
  }
}
ClientNav.contextType = AppContext;
