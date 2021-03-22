import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCitys } from '../../actions/city';
import CityItem from './CityItem';
import CityForm from './CityForm';
import Spinner from '../layout/Spinner';
import { Row, Col } from 'react-bootstrap';

/*const Citys = ({ getCitys, city: { citys, loading } }) => {
  useEffect(() => {
    getCitys();
  }, [getCitys]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Citys</h1>
      <p className='lead'>
        <i className='fas fa-user'> </i> Welcom To The World weather
      </p>

      <div className='container'>
        {citys.map((city, index) => (
          <CityItem key={city._id} city={city} />
        ))}
      </div>
    </Fragment>
  );
}*/
const Citys = ({ getCitys, city: { citys, loading } }) => {
  useEffect(() => {
    getCitys();
  }, [getCitys]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Citys</h1>
      <p className='lead'>
        <i className='fas fa-user'> </i> Welcom To The World weather
      </p>
      <CityForm />
      <Row>
        {citys.map((city, index) => (
          <Col xs='4' key={index}>
            <CityItem key={city._id} city={city} />{' '}
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};
Citys.propTypes = {
  getCitys: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});
export default connect(mapStateToProps, { getCitys })(Citys);
