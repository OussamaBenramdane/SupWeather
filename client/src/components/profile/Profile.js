//Parent compenent for all the ather profile componenet

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import ProfileTop from './ProfileTop';

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading, auth },
  match
}) => {
  useEffect(() => {
    getCurrentProfile(match.params.id);
  }, [getCurrentProfile, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          Profile
          <Link to='/dashboard' className='btn btn-light'>
            Back to Dashboard
          </Link>
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
          <div class='profile-grid my-1'>
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
