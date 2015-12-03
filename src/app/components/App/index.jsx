/* @flow */
/* global ble */

import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Status from '../Status';

import logoImg from '../../img/logo.svg';
import profileImg from '../../img/profile.png';

import {fetchStatusesOnInterval} from '../../actions';

class App extends Component {

  componentDidMount() {

    console.log('XXX Component did mount');

    const { dispatch } = this.props;
    dispatch(fetchStatusesOnInterval);

    let success = (data) => {
      console.log('XXX CONNECT SUCCESS! YES!', data);
    };

    let failure = (error) => {
      console.log('XXX CONNECT fail :(', error);
    };

    // TESTING BLUETOOTH CONNECTION
    ble.connect(0xDE4ECAE96879, success, failure);

  }

  // RENDER
  _renderStatuses() {

    return this.props.users.map((status) => {
      return <Status {...status} key={status.email} />;
    });
  }

  render() {
    return (
      <div className={'page__home'}>
        <div className={'collr-wrapper'}>
            <header>
                <img src={'img/logo.svg'} alt="Collr-io Logo" />
            </header>
            <div>
                <img src={'img/profile.png'} alt="pet-profile"/>
                <h3>WINSTON</h3>
            </div>
            <button>Colour</button>
            <button>Animation</button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const {users, isFetching} = state;

  return {
    users,
    isFetching
  };
}

export default connect(mapStateToProps)(App);


