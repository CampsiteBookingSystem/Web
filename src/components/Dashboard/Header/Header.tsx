import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { State } from '../../../store';
import { VulpeeApi } from '../../../api';
import { handleError } from '../../../helpers';
import { AppActionTypes } from '../../../actions';

import logo from '../../../assets/images/logo.png';

import './Header.css';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useSelector((state: State) => state.app);

  async function handleClick() {
    try {
      await VulpeeApi.getInstance().logout();
    } catch (exception) {
      handleError(exception);
    }

    dispatch({ type: AppActionTypes.LOGOUT });

    history.push('/');
  }

  return (
    <header className="Header">
      <Link to="/" className="Header__logo">
        <img src={logo} alt="Vulpee logo" className="Header__logo-image" height="24px" />
        <span className="Header__logo-text">Vulpee</span>
      </Link>
      <div className="Header__actions">
        {user && (
          <span className="Header__user">
            {user.firstName} {user.lastName}
          </span>
        )}
        <button className="Header__logout" onClick={handleClick}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
