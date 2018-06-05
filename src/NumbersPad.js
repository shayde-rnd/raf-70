import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const Row = styled.div`
display: flex;
flex-direction: row;
justify-content: ${({align}) => align};
width: 100%;
`

const ContainerPad = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
height: 400px;`

const styles = theme => ({
  button: {
    margin: '12px',
    backgroundColor: 'transparent',
    border: '1px solid black',
    width: '70px',
    height: '70px',
    fontWeight: 'bold'
  },
  input: {
    display: 'none',
  },
});

const NumbersPad = ({classes, handleClick}) => {
  const renderButton = (number) => (<Button 
      variant="fab" 
      className={classes.button}
      onClick={
        () => handleClick(number)
      }>
      {number}
    </Button>)
  
  return (
    <ContainerPad>
      <Row>
          {renderButton(7)}
          {renderButton(8)}
          {renderButton(9)}
      </Row>
      <Row>
          {renderButton(4)}
          {renderButton(5)}
          {renderButton(6)}
      </Row>
      <Row>
          {renderButton(1)}
          {renderButton(2)}
          {renderButton(3)}
      </Row>
      <Row align="space-between">
          {renderButton(0)}
          {renderButton('X')}
      </Row>
    </ContainerPad>
    )
};

NumbersPad.propTypes={
  handleClick: PropTypes.func.isRequired
}

export default withStyles(styles)(NumbersPad);
