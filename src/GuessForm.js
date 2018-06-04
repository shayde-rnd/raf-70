import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Label from './Label'
import Input from './Input'
import ResultsDialog from './ResultsDialog'


const Container = styled.div`
flex: 6;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
background-image: linear-gradient(45deg, #356d4d 25%, transparent 25%), 
    linear-gradient(-45deg, #356d4d 25%, transparent 25%), 
    linear-gradient(45deg, transparent 45%, #356d4d 75%), 
    linear-gradient(-45deg, transparent 45%, #356d4d 75%);
background-size: 2px 2px;
background-position: 0 0, 1px 0, 1px -1px, 0px 1px;
`;

const StyledLabel = styled(Label)`
margin: 20px;
`;

class GuessForm extends Component {

  componentWillMount(){
    this.setState({
      input: '',
      resultsDialogOpen: false
    })
  }

  componentWillReceiveProps(nextProps){
    if(!Number(nextProps.numberFromPad) && nextProps.numberFromPad !== 0){
      this.setState({
        input: this.state.input.slice(0, this.state.input.length - 1)
      })
    } else {
      this.setState({
        input: this.state.input + nextProps.numberFromPad
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
        <StyledLabel>Wisdom Of Crowed</StyledLabel>
        <Avatar className={this.props.classes.avatar}>?</Avatar>
        <Label>What's your guess</Label>
        <Input value={this.state.input}/>
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

GuessForm.propTypes = {
  numberFromPad: PropTypes.any
}


export default withStyles({
  avatar: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#40675f',
    backgroundColor: 'white',
    width: '100px',
    height: '100px'
  },
  button: {
    width: '300px',
    margin: '20px',
    color: 'white',
    backgroundColor: 'black',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif']
  }
})(GuessForm);
