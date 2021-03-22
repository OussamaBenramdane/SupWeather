import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCity } from '../../actions/city';

const CityForm = ({ addCity }) => {
  const [cityName, setcityName] = useState('');
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Add a city</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          addCity({ cityName });
          setcityName('');
        }}
      >
        <textarea
          name='text'
          cols='5'
          rows='1'
          placeholder='City name ...'
          value={cityName}
          onChange={(e) => setcityName(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Add' />
      </form>
    </div>
  );
};

CityForm.propTypes = {
  addCity: PropTypes.func.isRequired,
};

export default connect(null, { addCity })(CityForm);
