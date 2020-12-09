import React, { useState } from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
// import {create} from './api-user.js'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'
import { Link } from 'react-router-dom'
import { createMuiTheme } from 'material-ui/styles';
import API from "../Utils/API-User";


const Signup = () => {

  const theme = createMuiTheme();
  const classes = {
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 2
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing.unit * 2
    }
  };

  const [state, setState] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  });

  const handleChange = name => event => {
    setState({...state, [name]: event.target.value })
  }

  const clickSubmit = () => {
    const user = {
      name: state.name || undefined,
      email: state.email || undefined,
      password: state.password || undefined
    }
    API.signup(user).then((data) => {
      if (data.error) {
        setState({...state, error: data.error })
      } else {
        setState({...state, error: '', open: true })
      }
    })
  }
  return (
    <div>
      <Card style={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" style={classes.title}>
            Sign Up
          </Typography>
          <TextField id="name" label="Name" style={classes.textField} value={state.name} onChange={handleChange('name')} margin="normal" /><br />
          <TextField id="email" type="email" label="Email" style={classes.textField} value={state.email} onChange={handleChange('email')} margin="normal" /><br />
          <TextField id="password" type="password" label="Password" style={classes.textField} value={state.password} onChange={handleChange('password')} margin="normal" />
          <br /> {
            state.error && (<Typography component="p" color="error">
              <Icon color="error" style={classes.error}>error</Icon>
              {state.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={clickSubmit} style={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default Signup;