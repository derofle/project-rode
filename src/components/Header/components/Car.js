import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Car extends Component {
  state = {
    animation: null,
    firstLoad: false,
  };

  componentDidMount() {
    const loop = keyframes`
    0% {left: -80px; }
    100% {left: 30vw;}
`;
    this.setState({
      animation: loop,
      firstLoad: true,
    });
  }

  componentDidUpdate() {
    if (this.props.rideMove) {
      this.props.rideMoved();
      const ride = keyframes`
    from {left: ${this.props.offsetCar}px;}
    to {left: ${this.props.offsetTab}px;}
`;

      this.setState({
        animation: ride,
      });
    }
  }

  carClicked = () => {
    this.props.rideMoved();
    this.props.moveCar();
    const ride = keyframes`
      from {left: ${this.props.offsetCar}px;}
      to {left: 110vw;}
  `;

    this.setState({
      animation: ride,
    });
  };

  render() {
    const Rotate = styled.div`
      animation: ${this.state.animation} 5s forwards;
      background-image: url('/img/car.png'), url('/img/car.png'),
        url('/img/car.png');
      background-size: 40px 30px;
      background-repeat: no-repeat, no-repeat, no-repeat;
      background-position: 0 bottom, 45px bottom, 90px bottom;
      position: relative;
      width: 140px;
      height: 35px;
      overflow: hidden;
    `;
    return <Rotate id="car" onClick={this.carClicked} />;
  }
}

export default Car;
