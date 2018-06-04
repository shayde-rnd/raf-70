import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Label from './Label'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
`;

const TupleContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 0px 0px 80px 0px;
`


const progressTransition = {
  guess: 'avarage',
  avarage: 'actual'
}

const MAX_PROGRESS = 600;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ResultsDialog extends Component {

  componentWillMount(){

    const statusFromLocalStorage = this.getStatusFromStorage();
    const attempts = (statusFromLocalStorage.attempts || 0)
    const avarage = Number(statusFromLocalStorage.avarage || this.props.guess)

    this.setState({
      progress: 0,
      avarage,// TODO from localstorage
      actual: 328
    });
    this.timer = null;
    this.currentProgress = 'guess'
  }

  getStatusFromStorage = () => {
    return JSON.parse(localStorage.getItem('guessStatus') || '{}')
  }

  setProgressTimer = () => {
    this.timer = setInterval(this.progress, 100);
  }

  componentDidMount(){
    this.setProgressTimer()
  }

  componentWillUnmount() {
    const statusFromLocalStorage = this.getStatusFromStorage();
    const attempts = (statusFromLocalStorage.attempts || 0) + 1
    const avarage = this.props.guess !== '' ? (((statusFromLocalStorage.avarage || 0) * (statusFromLocalStorage.attempts || 0)) + Number(this.props.guess)) / attempts : 
                                              statusFromLocalStorage.avarage || this.props.guess
    localStorage.setItem('guessStatus', JSON.stringify({
      avarage,
      attempts
    }))
    clearInterval(this.timer);
  }

  handleClose = () => {
    this.props.handleClose()
  }

  progress = () => {
    let currentLimit = this.currentProgress === 'guess' ? this.props.guess : this.state[this.currentProgress]
    if(currentLimit > MAX_PROGRESS){
      currentLimit = MAX_PROGRESS
    }
    if (this.state.progress >= Math.round( (currentLimit / MAX_PROGRESS) * 100)) {
      clearInterval(this.timer);
      if(this.currentProgress !== 'actual'){
        this.currentProgress = progressTransition[this.currentProgress];
        this.setState({ progress: 0 });
        this.setProgressTimer()
      }
    } else {
      this.setState({ progress: this.state.progress + 10 });
    }
  };

  renderProgress = (value, title) => {
    return (
      <TupleContainer>
        <Label>{title}</Label>
        <LinearProgress 
          variant="determinate"
          color="secondary" 
          value={value}
          className={this.props.classes.myGuess}/>
      </TupleContainer>
    )
  }

  render() {

    let guess = 0;
    let avarage = 0;
    let actual = 0;

    if(this.currentProgress === 'guess'){
      guess = this.state.progress;
    }
    if(this.currentProgress === 'avarage'){
      guess = Math.round( (this.props.guess / MAX_PROGRESS) * 100);
      avarage = this.state.progress;
    }
    if(this.currentProgress === 'actual'){
      guess = Math.round( (this.props.guess / MAX_PROGRESS) * 100);;
      avarage = Math.round( (this.state.avarage / MAX_PROGRESS) * 100);
      actual = this.state.progress;
    }
    
    return (
        <Dialog 
          maxWidth={false}
          classes={{paper: this.props.classes.paper}}
          TransitionComponent={Transition}
          open={true}
          onClose={this.handleClose}>
          <Container>
              { this.renderProgress(guess, 'Your guess')}
              { this.renderProgress(avarage, `Avarage (${((this.getStatusFromStorage() || {}).attempts || 0) + 1} attempts)`)}
              { this.renderProgress(actual, 'Reality')}
            </Container>
        </Dialog>);
      }
}

ResultsDialog.propTypes = {
  handleClose: PropTypes.func,
  guess: PropTypes.number
}

export default withStyles({
  myGuess:{
    width: '80%',
    height: '10px',
    backgroundColor: 'white',
    borderRadius: '4px'
  },
  paper: {
    width: '900px',
    height: '800px',
    backgroundImage: `linear-gradient(45deg, #356d4d 25%, transparent 25%), 
                      linear-gradient(-45deg, #356d4d 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 35%, #356d4d 75%), 
                      linear-gradient(-45deg, transparent 35%, #356d4d 75%)`,
    backgroundSize: '2px 2px',
    backgroundPosition: '0 0, 1px 0, 1px -1px, 0px 1px',
    padding: '0px'
  }
})(ResultsDialog);
