import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Label from './Label'
import Input from './Input'
import ResultsDialog from './ResultsDialog'
import NumbersPad from './NumbersPad'

/**
 * background-image: linear-gradient(45deg, #356d4d 25%, transparent 25%), 
    linear-gradient(-45deg, #356d4d 25%, transparent 25%), 
    linear-gradient(45deg, transparent 45%, #356d4d 75%), 
    linear-gradient(-45deg, transparent 45%, #356d4d 75%);
background-size: 2px 2px;
background-position: 0 0, 1px 0, 1px -1px, 0px 1px;
 */

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
background-color: transparent;
z-index: 100;
`;

const StyledLabel = styled(Label)`
margin-bottom: 80px;
margin-top: 0px;
font-size: 60px;
color: #000;
`;

class GuessForm extends Component {

  componentWillMount(){
    this.setState({
      input: '',
      resultsDialogOpen: false
    })
  }

  handleNumberClicker(number){
    if(!Number(number) && number !== 0){
      this.setState({
        input: this.state.input.slice(0, this.state.input.length - 1)
      })
    } else {
      this.setState({
        input: this.state.input + number
      })
    }
  }

  handleShowResults = () => {
    this.setState({
      resultsDialogOpen: !this.state.resultsDialogOpen
    })
  }

  render() {
    return (
      <Container>
        <StyledLabel>WISDOM OF CROWED</StyledLabel>
        <Avatar className={this.props.classes.avatar}>?</Avatar>
        <Label>What's your guess</Label>
        <Input value={this.state.input}/>
        <NumbersPad handleClick={ (number) => {
          this.handleNumberClicker(number)
          }}/>
        <Button className={this.props.classes.button} onClick={ this.handleShowResults }>Check it out!</Button>
        {
          this.state.resultsDialogOpen && 
          <ResultsDialog handleClose={() => this.setState({resultsDialogOpen: false, input: ''})}
            guess={this.state.input}
            />}
      </Container>
    )
  }
}

export default withStyles({
  avatar: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    width: '100px',
    height: '100px'
  },
  button: {
    marginTop: '20px',
    width: '400px',
    color: 'white',
    backgroundColor: 'black',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif']
  }
})(GuessForm);
