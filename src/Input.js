// import React from 'react';
// import PropTypes from 'prop-types'
// import styled from 'styled-components';

// const StyledInput = styled.input`
// width: 280px;
// height: 40px;
// margin: 20px;
// padding: 10px;
// font-size: 30px;
// border-width: 0px;
// background-color: white;
// border-radius: 5px;
// text-align: center;
// ::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
// }
// `;

// export default StyledInput;


import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    bootstrapRoot: {
      padding: 0
    },
    bootstrapInput: {
      textAlign: 'center',
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 20,
      padding: '10px 12px',
      width: '100%',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    }})

const Input = ({classes}) => (
    <TextField
        inputProps={{
            fontWidth: 'bold',
            fontSize: '10px',
        }}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          }
        }}
      />
);

export default withStyles(styles)(Input);
