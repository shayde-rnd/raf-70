import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
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
 // color: #f50057;
const StyledLabel = styled(Label)`
color: green;
`;

const contributionGrade = {
  wow: {text: "WOW", icon: "very-happy.svg"},
  fantastic: {text: "Fantastic", icon: "happy.svg"},
  nice: {text: "Nice", icon: "wink.svg"},
  areYouSerious: {text: "Are you serious?", icon: "unhappy.svg"}
}

class WisdomContribution extends Component {

  constructor() {
    super();
  }

  getWisdomContribution = () => {
    const status = dataProvider.getStatus();
    if(!this.props.guess){
      return {}
    }
    const delta = Math.abs(this.props.guess - status.actual)
    if(delta === 0){
      return contributionGrade.wow
    }
    if(delta < 50){
      return contributionGrade.fantastic
    }
    if(delta < 150){
      return contributionGrade.nice
    }
    return contributionGrade.areYouSerious
  }

  render() {
    if(!this.props.guess){
      return null;
    }
    const contribution = this.getWisdomContribution();
    return (
    <Container>
      <Label>Your Wisdom Contribution</Label>
      <StyledLabel marginTop="20px">{contribution.text}</StyledLabel>
      <Avatar
        src={contribution.icon}
      />
    </Container>)
  }
}

WisdomContribution.propTypes = {
  guess: PropTypes.any
};

export default WisdomContribution;
