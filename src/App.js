import React, { Component } from 'react';
import styled from 'styled-components';
import GuessForm from './GuessForm'
import NumbersPad from './NumbersPad'

const Layout = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
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
      <GuessForm numberFromPad={this.state.numberFromPad}/>
      <NumbersPad handleClick={ (numberFromPad) => {
        this.setState({
          numberFromPad
        })
      }}/>
    </Layout>
    )
  }
}

export default App;
