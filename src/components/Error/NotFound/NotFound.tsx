import React from 'react';

import './NotFound.css';
import { Link } from 'react-router-dom';

interface Props {
  title?: string;
  action?: string;
}

function NotFound(props: Props) {
  return (
    <div className="NotFound">
      <div className="NotFound__illustration" />
      <div className="NotFound__content">
        <h1 className="NotFound__title">{props.title}</h1>
        <div className="NotFound__actions">
          <Link className="NotFound__action" to={props.action || '/'}>
            Take me back
          </Link>
        </div>
      </div>
    </div>
  );
}

NotFound.defaultProps = {
  title: 'Page not found',
};

export default NotFound;
