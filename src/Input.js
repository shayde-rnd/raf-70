import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const StyledInput = styled.input`
width: 280px;
height: 40px;
margin: 20px;
padding: 10px;
font-size: 30px;
border: 1px solid black;
background-color: white;
border-radius: 5px;
text-align: center;
::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;

export default StyledInput;
