import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCity } from '../../actions/city';
const CityItem = ({
  deleteCity,
  city: { id, city, Mode, temperature, Min, Max, icon },
}) => {
  return (
    <div className='card weather-card'>
      <div className='card-body pb-3'>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt=''
        ></img>
        <h5 className='card-title font-weight-bold'>{city} </h5>

        <h3 className='card-text'>Mode : {Mode}</h3>
        <div className='d-flex justify-content-between'>
          <p className='display-2 degree'>{temperature}C</p>
          <i className='fas fa-sun-o fa-5x pt-3 amber-text'></i>
        </div>
        <div className='d-flex justify-content-between mb-4'>
          <h5>
            <i className='fas fa-temperature-low fa-lg text-info pr-2'></i>
            {Min} C Min
          </h5>
          <h5>
            <i className='fas fa-temperature-high fa-lg grey-text pr-2'></i>
            {Max} C Max
          </h5>
        </div>

        <button
          onClick={(e) => deleteCity(id)}
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
