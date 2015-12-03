/* @flow */
/* global ble */

import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Status from '../Status';
import logoImg from '../../img/logo.svg';
import profileImg from '../../img/profile.png';

import {fetchStatusesOnInterval} from '../../actions';

// var bluetoothSerial = window.bluetoothSerialSerial || {connect:function(){}, write:function(){}};

const bark = new Audio('audio/bark.mp3');
const jingle = new Audio('audio/jingle.mp3');
class App extends Component {

  componentWillMount(){
    document.addEventListener("deviceready", this.eventHandlers.bind(this), false);
  }

  eventHandlers(){
    if(!this.state.connected)
      window.ble.scan([],5,this.search.bind(this), this.error.bind(this));
  }

  constructor(props){
    super(props);
    this.state = {connected:false, sent:false, type:''};
  }

  search(d){
    console.log('-----')
    console.log(d.name);
    console.log(d.id);
    console.log('-----')
    if(d.name === 'Adafruit Bluefruit LE'){
      this.connect(d);
    }
  }

  connect(d){
    var _this = this;
    bluetoothSerial.connect(d.id, (res) => {
      _this.setState({connected:true});
    }, this.error);
  }

  error(e){
    console.log('error', e);
  }

  render() {
    return (
      <div> 
        <div className={'collr-wrapper'}>
            <header>
                <img src={'img/logo.svg'} alt="Collr-io Logo" />
                <p>The most fabulous dogs in the world</p>
            </header>
            <div>
                <img src={'img/profile.png'} alt="pet-profile"/>
                <h3>WINSTON</h3>
                <h4> {this.state.type} </h4>
                <h4> Connected: {this.state.connected === true ? 'YES' : 'NO'}</h4> 
            </div>
            <button onClick={this.eventHandlers.bind(this)}>Connect</button>
            <button onClick={this.blue.bind(this)}>BLUE</button>
            <button onClick={this.unionjack.bind(this)}>UNION FLAG</button>
            <button onClick={this.animate2.bind(this)}>PARY TIME</button>
            <button onClick={this.animate3.bind(this)}>PARTY</button>
            <button onClick={this.animate4.bind(this)}>Jingle Bells</button>
        </div>
       </div>
    );
  }
  unionjack(){
      var _this = this;
      var data = new Uint8Array(5);
      data[0] = 0x21; // !
      data[1] = 0x42; // C
      data[2] = 0x31; // // upto 34
      data[3] = 0x30; // 5
      data[4] = 0x3B; // 5

      bluetoothSerial.write(data, (res) => {
        _this.setState({sent: true, type:'unionjack'});
      }, this.error);

      bark.play();
  }

  animate2(){
      var _this = this;
      var data = new Uint8Array(5);
      data[0] = 0x21; // !
      data[1] = 0x42; // C
      data[2] = 0x32; // // upto 34
      data[3] = 0x30; // 5
      data[4] = 0x3A; // 5

      bluetoothSerial.write(data, (res) => {
        _this.setState({sent: true, type:'PARTY TIME'});
      }, this.error);

      bark.play();
  }

  animate3(){
      var _this = this;
      var data = new Uint8Array(5);
      data[0] = 0x21; // !
      data[1] = 0x42; // C
      data[2] = 0x33; // // upto 34
      data[3] = 0x30; // 5
      data[4] = 0x39; // 5
//0x21 0x42 0x33 0x30 0x39
      bluetoothSerial.write(data, (res) => {
        _this.setState({sent: true, type:'PARTY'});
      }, this.error);
      bark.play();
  }

  animate4(){
      var _this = this;
      var data = new Uint8Array(5);
      data[0] = 0x21; // !
      data[1] = 0x42; // C
      data[2] = 0x34; // // upto 34
      data[3] = 0x30; // 5
      data[4] = 0x38; // 5

      bluetoothSerial.write(data, (res) => {
        _this.setState({sent: true, type:'JINGLE BELLS'});
      }, this.error);

      jingle.play();
  }


  blue(){
      var _this = this;
      var data = new Uint8Array(6);
      data[0] = 0x21; // !
      data[1] = 0x43; // C
      data[2] = 0x67; // 5
      data[3] = 0x3B; // 5
      data[4] = 0xFF; // 5
      data[5] = 0xFA;

      bluetoothSerial.write(data, (res) => {
        _this.setState({sent: true, type:'BLUE'});
      }, this.error);
      bark.play();

  }
};

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


