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
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Label from './Label'
import WisdomContribution from './WisdomContribution'
import * as dataProvider from './dataProvider'

const Container = styled.div`
margin-top: 30px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
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

const ProgressContainer = styled.div`
position: relative;
display: flex;
width: 100%;
flex-direction: row;
justify-content: center;
`

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ResultsDialog extends Component {

  componentWillMount(){

    const status = dataProvider.getStatus();
    const avarage = Number(status.avarage || this.props.guess)

    this.setState({
      progress: 0,
      avarage,// TODO from localstorage
      actual: status.actual
    });
    this.timer = null;
    this.currentProgress = 'guess'
  }

  setProgressTimer = () => {
    this.timer = setInterval(this.progress, 100);
  }

  componentDidMount(){
    this.setProgressTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.closeTimer)
  }

  progress = () => {
    const maxProgress = dataProvider.getStatus().actual * 2
    let currentLimit = this.currentProgress === 'guess' ? this.props.guess : this.state[this.currentProgress]
    if(currentLimit > maxProgress){
      currentLimit = maxProgress
    }
    if (this.state.progress >= Math.round( (currentLimit / maxProgress) * 100)) {
      clearInterval(this.timer);
      if(this.currentProgress !== 'avarage'){
        this.currentProgress = 'avarage';
        this.setState({ progress: 0 });
        this.setProgressTimer()
      } else {
        this.setState({showContribution: true})
        this.closeTimer = setTimeout(() => {
          this.props.handleClose()
        }, 4000);
      }
    } else {
      this.setState({ progress: this.state.progress + 10 });
    }
  };

  renderProgress = (value, title) => {
    return (
      <TupleContainer>
        <Label>{title}</Label>
        <ProgressContainer>
          <Avatar className={this.props.classes.avatar}/>
          <LinearProgress 
            variant="determinate"
            color="secondary" 
            value={value}
            className={this.props.classes.progress}/>
        </ProgressContainer>
      </TupleContainer>
    )
  }

  render() {

    let guess = 0;
    let avarage = 0;
    let actual = 0;
    const maxProgress = dataProvider.getStatus().actual * 2
    const currentAttempts = dataProvider.getStatus().attempts;
    const attempts = this.props.guess !== '' ? currentAttempts + 1 : currentAttempts

    if(this.currentProgress === 'guess'){
      guess = this.state.progress;
    }

    if(this.currentProgress === 'avarage'){
      guess = Math.round( (this.props.guess / maxProgress) * 100);
      avarage = this.state.progress;
    }
    
    return (
        <Dialog 
          maxWidth={false}
          classes={{paper: this.props.classes.paper}}
          TransitionComponent={Transition}
          open={true}
          onClose={() => this.props.handleClose()}>
          <Container>
              { this.renderProgress(guess, 'Your guess')}
              { this.renderProgress(avarage, `Avarage (${attempts} attempts)`)}
              {
                this.state.showContribution && 
                <WisdomContribution guess= { this.props.guess }/>
              }
          </Container>
        </Dialog>);
      }
}

ResultsDialog.propTypes = {
  handleClose: PropTypes.func,
  guess: PropTypes.number
}

export default withStyles({
  avatar: {
    zIndex: 1,
    left: '50%',
    position: 'absolute',
    backgroundColor: 'black',
    width: '20px',
    height: '20px'
  },
  progress:{
    width: '80%',
    height: '20px',
    border: "1px solid black",
    backgroundColor: 'white',
    borderRadius: '6px'
  },
  paper: {
    width: '900px',
    height: '800px',
    padding: '0px'
  }
})(ResultsDialog);
