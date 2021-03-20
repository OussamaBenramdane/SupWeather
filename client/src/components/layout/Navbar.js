import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <Link to='/citys'>Citys</Link>
      </li>
      <li>
        <Link className='nav-item nav-link' to='/dashboard'>
          <i className='fas fa-user'></i>
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const gestLinks = (
    <ul>
      <li>
        <Link className='nav-item nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link className='nav-item nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar navbar-dark bg-primary'>
      <h1>
        <Link to='/'>
          <i className='fa fa-cloud'></i> SupWeather
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : gestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
