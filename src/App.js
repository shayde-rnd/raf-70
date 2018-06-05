import React, { Component } from 'react';
import styled from 'styled-components';
import GuessForm from './GuessForm'

const Layout = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
position: relative;
`;

const Background = styled.div`
width: 100%;
height: 100%;
position: absolute;
background-image: url("candy-can.jpg");
background-repeat: no-repeat;
background-size: cover;
opacity: 0.5;
`;

class App extends Component {

  componentWillMount(){
    this.setState({
      numberFromPad: null
    })
  }

  render() {
    return (
    <Layout>
      <Background/>
      <GuessForm numberFromPad={this.state.numberFromPad}/>
    </Layout>
    )
  }
}

export default App;
