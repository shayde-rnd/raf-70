import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Label from './Label'
import styled from 'styled-components';
import * as dataProvider from './dataProvider'

const Container = styled.div`
display: flex;
flex-direction: column;
width: 80%;
justify-content: flex-start;
align-items: center;
margin-top: ${({marginTop}) => marginTop || '60px'};
`;

const StyledLabel = styled(Label)`
color: #f50057;
`;

class WisdomContribution extends Component {

  constructor() {
    super();
  }

  getWisdomContribution = () => {
    const status = dataProvider.getStatus();
    if(!this.props.guess){
      return null
    }
    const delta = Math.abs(this.props.guess - status.actual)
    if(delta === 0){
      return "WOW"
    }
    if(delta < 50){
      return "Fantastic"
    }
    if(delta < 100){
      return "Nice"
    }
    return "Are you serious?"
  }

  render() {
    if(!this.props.guess){
      return null;
    }
    return (
    <Container>
      <Label>Your Wisdom Contribution</Label>
      <StyledLabel marginTop="20px">{this.getWisdomContribution()}</StyledLabel>
    </Container>)
  }
}

WisdomContribution.propTypes = {
  guess: PropTypes.any
};

export default WisdomContribution;
