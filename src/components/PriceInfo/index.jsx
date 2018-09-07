import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  color: rgba(0, 0, 0, 0.20);
  font-size: 60px;
  font-weight: 600;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
`;

const Time = styled.div`
  color: rgba(0, 0, 0, 0.20);
  font-size: 20px;
`;

export default class PriceInfo extends React.Component {
  state = {
    time: '',
    rate: '',
  };

  updatePriceData = ({ time, rate }) => {
    this.setState({
      time,
      rate,
    });
  }

  render() {
    const { time, rate } = this.state;

    return (
      <Wrapper>
        <Time>{time}</Time>
        <div>{rate}</div>
      </Wrapper>
    );
  }
}
