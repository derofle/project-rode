import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';

class Car extends Component {
  state = {
    animation: null,
  };

  componentDidMount() {
    const loop = keyframes`
    0% {left: -50px; }
    100% {left: 200px;}
`;

    this.setState({
      animation: loop,
    });
  }

  componentDidUpdate() {
    if (this.props.rideMove) {
      this.props.rideMoved();
      const ride = keyframes`
    from {left: ${this.props.offsetCar}px;}
    to {left: ${this.props.offsetTab + 35}px;}
`;

      this.setState({
        animation: ride,
      });
    }
  }

  render() {
    const Rotate = styled.div`
      animation: ${this.state.animation} 5s forwards;
      background-image: url('/img/car.png');
      background-size: 40px 30px;
      background-repeat: no-repeat;
      background-position: bottom;
      position: relative;
      width: 50px;
      height: 35px;
    `;
    return <Rotate id="car" />;
  }
}

export default Car;
