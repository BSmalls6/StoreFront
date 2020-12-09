import React, { useEffect, useState } from 'react'
import { withStyles } from 'material-ui/styles'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import { createMuiTheme } from 'material-ui/styles'
import axios from "axios"
import Button from 'material-ui/Button'
import { withRouter } from 'react-router-dom'

const Checkout = withRouter(({ history, currUser, setCurrUser }) => {

  const theme = createMuiTheme();
  const classes = {
    card: {
      margin: '24px 0px',
      padding: '16px 40px 90px 40px',
      backgroundColor: '#80808017'
    },
    title: {
      margin: '24px 16px 8px 0px',
      color: theme.palette.openTitle
    },
    subheading: {
      color: 'rgba(88, 114, 128, 0.87)',
      marginTop: "20px",
    },
    addressField: {
      marginTop: "4px",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "45%"
    },
    streetField: {
      marginTop: "4px",
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "93%"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "90%"
    }
  }

  const [state, setState] = useState({
    checkoutDetails: {
      customer_name: '',
      customer_email: '',
      delivery_address: { street: '', city: '', state: '', zipcode: '', country: '' }
    },
    error: ''
  });

  useEffect(() => {
    let checkoutDetails = state.checkoutDetails
    checkoutDetails.customer_name = currUser.name
    checkoutDetails.customer_email = currUser.email
    setState({ ...state, checkoutDetails: checkoutDetails })
  }, [])

  const handleCustomerChange = name => event => {
    let checkoutDetails = state.checkoutDetails
    checkoutDetails[name] = event.target.value || undefined
    setState({ checkoutDetails: checkoutDetails })
  }

  const handleAddressChange = name => event => {
    let checkoutDetails = state.checkoutDetails
    checkoutDetails.delivery_address[name] = event.target.value || undefined
    setState({ checkoutDetails: checkoutDetails })
  }

  const updateCurrUser = (updateObj) => {
    axios.put(`../api/users/update/${currUser.id}`, updateObj)
      .then(result => {
        console.log(result);
        setCurrUser({ ...currUser, updateObj });
        window.location.reload();
      })
  }

  const placeOrder = () => {
    let newOrder = [...currUser.orders, ...currUser.cart];
    let newCart = [];
    updateCurrUser({cart:newCart,orders:newOrder});
  }

  return (
    <Card style={classes.card}>
      <Typography type="title" style={classes.title}>
        Checkout
        </Typography>
      <TextField id="name" label="Name" style={classes.textField} value={state.checkoutDetails.customer_name} onChange={handleCustomerChange('customer_name')} margin="normal" /><br />
      <TextField id="email" type="email" label="Email" style={classes.textField} value={state.checkoutDetails.customer_email} onChange={handleCustomerChange('customer_email')} margin="normal" /><br />
      <Typography type="subheading" component="h3" style={classes.subheading}>
        Delivery Address
        </Typography>
      <TextField id="street" label="Street Address" style={classes.streetField} value={state.checkoutDetails.delivery_address.street} onChange={handleAddressChange('street')} margin="normal" /><br />
      <TextField id="city" label="City" style={classes.addressField} value={state.checkoutDetails.delivery_address.city} onChange={handleAddressChange('city')} margin="normal" />
      <TextField id="state" label="State" style={classes.addressField} value={state.checkoutDetails.delivery_address.state} onChange={handleAddressChange('state')} margin="normal" /><br />
      <TextField id="zipcode" label="Zip Code" style={classes.addressField} value={state.checkoutDetails.delivery_address.zipcode} onChange={handleAddressChange('zipcode')} margin="normal" />
      <TextField id="country" label="Country" style={classes.addressField} value={state.checkoutDetails.delivery_address.country} onChange={handleAddressChange('country')} margin="normal" />
      <br /> {
        state.error && (<Typography component="p" color="error">
          <Icon color="error" style={classes.error}>error</Icon>
          {state.error}</Typography>)
      }
      <div>
          <Button color="secondary" variant="raised" onClick={placeOrder}>Place Order</Button>
      </div>
    </Card>
  )

})


export default Checkout