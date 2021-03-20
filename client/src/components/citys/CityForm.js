import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCity } from '../../actions/city';

const CityForm = ({ addCity }) => {
  const [text, setText] = useState('');
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Add a city</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addCity({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='5'
          rows='1'
          placeholder='City name ...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CityForm.propTypes = {
  addCity: PropTypes.func.isRequired,
};

export default connect(null, { addCity })(CityForm);
