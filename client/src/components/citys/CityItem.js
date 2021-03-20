import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteCity } from '../../actions/city';
const CityItem = ({
  auth,
  deleteCity,
  city: { _id, city, Mode, temperature, Min, Max, icon },
}) => {
  return (
    <div className='card weather-card'>
      <div className='card-body pb-3'>
        <img src={require(`../../img/${icon}.png`)} alt=''></img>
        <h4 className='card-title font-weight-bold'>{city}</h4>

        <p className='card-text'>
          <Moment fromat='LLL'></Moment>, Mostly {Mode}
        </p>
        <div className='d-flex justify-content-between'>
          <p className='display-1 degree'>{temperature}</p>
          <i className='fas fa-sun-o fa-5x pt-3 amber-text'></i>
        </div>
        <div className='d-flex justify-content-between mb-4'>
          <p>
            <i className='fas fa-tint fa-lg text-info pr-2'></i>3% Precipitation
          </p>
          <p>
            <i className='fas fa-leaf fa-lg grey-text pr-2'></i>21 km/h Winds
          </p>
        </div>
        <div className='progress md-progress'></div>
        <ul className='list-unstyled d-flex justify-content-between font-small text-muted mb-4'>
          <li className='pl-4'>8AM</li>
          <li>11AM</li>
          <li>2PM</li>
          <li>5PM</li>
          <li className='pr-4'>8PM</li>
        </ul>

        <button
          onClick={(e) => deleteCity(_id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times'></i>
        </button>
      </div>
    </div>
  );
};

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteCity })(CityItem);
