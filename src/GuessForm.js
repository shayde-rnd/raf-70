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
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #91f5ed;
height: 100%;

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
