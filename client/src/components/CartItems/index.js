import React, { useState, useEffect } from 'react'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import { createMuiTheme } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import axios from "axios"


const CartItems = withRouter(({ history, ...props }) => {
  const theme = createMuiTheme();
  const classes = {
    card: {
      margin: '24px 0px',
      padding: '16px 40px 60px 40px',
      backgroundColor: '#80808017'
    },
    title: {
      margin: theme.spacing.unit * 2,
      color: theme.palette.openTitle,
      fontSize: '1.2em'
    },
    price: {
      color: theme.palette.text.secondary,
      display: 'inline'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginTop: 0,
      width: 50
    },
    productTitle: {
      fontSize: '1.15em',
      marginBottom: '5px'
    },
    subheading: {
      color: 'rgba(88, 114, 128, 0.67)',
      padding: '8px 10px 0',
      cursor: 'pointer',
      display: 'inline-block'
    },
    cart: {
      width: '100%',
      display: 'inline-flex'
    },
    details: {
      display: 'inline-block',
      width: "100%",
      padding: "4px"
    },
    content: {
      flex: '1 0 auto',
      padding: '16px 8px 0px'
    },
    cover: {
      width: 160,
      height: 125,
      margin: '8px'
    },
    itemTotal: {
      float: 'right',
      marginRight: '40px',
      fontSize: '1.5em',
      color: 'rgb(72, 175, 148)'
    },
    checkout: {
      float: 'right',
      margin: '24px'
    },
    total: {
      fontSize: '1.2em',
      color: 'rgb(53, 97, 85)',
      marginRight: '16px',
      fontWeight: '600',
      verticalAlign: 'bottom'
    },
    continueBtn: {
      marginLeft: '10px'
    },
    itemShop: {
      display: 'block',
      fontSize: '0.90em',
      color: '#78948f'
    },
    removeButton: {
      fontSize: '0.8em'
    }
  };

  const [state, setState] = useState({
    cartItems: [],
  })

  useEffect(()=>{
    setState({...state,cartItems:props.currUser.cart});
  },[])

  const updateCurrUser = (updateObj) =>{
    axios.put(`../api/users/update/${props.currUser.id}`, updateObj)
    .then(result =>{
        console.log(result);
        setState({...state, updateObj })
      })
}

  const handleChange = index => event => {
    let cartItems = state.cartItems
    if (event.target.value == 0) {
      cartItems[index].quantity = 1
    } else {
      cartItems[index].quantity = event.target.value
    }
    updateCurrUser({cartItems: cartItems});
    //setState({...state, cartItems: cartItems })
    // cart.updateCart(index, event.target.value)
  }

  const getTotal = () => {
    return state.cartItems.reduce((a, b) => {
      return a + (b.quantity * b.price)
    }, 0).toFixed(2);
  }

  const removeItem = index => event => {
    let cartItems = state.cartItems;
    cartItems.splice(index,1);
    if (cartItems.length == 0) {
      props.setCheckout(false)
    }
    updateCurrUser({cartItems: cartItems});
    //setState({...state, cartItems: cartItems })
  }

  const openCheckout = () => {
    console.log("here");
    props.setCheckout({...props.state, checkout:true});
  }


  return (
    <Card style={classes.card}>
      <Typography type="title" style={classes.title}>
        Shopping Cart
      </Typography>
      {state.cartItems.length > 0 ? (<span>
        {state.cartItems.map((item, i) => {
          return <span key={i}><Card style={classes.cart}>
            <CardMedia
              style={classes.cover}
              image={item.image}
              title={item.name}
            />
            <div style={classes.details}>
              <CardContent style={classes.content}>
                <a href={item.link} target="_blank"><Typography type="title" component="h3" style={classes.productTitle} color="primary">{item.name}</Typography></a>
                <div>
                  <Typography type="subheading" component="h3" style={classes.price} color="primary">$ {item.price}</Typography>
                  <span style={classes.itemTotal}>${item.price * item.quantity}</span>
                </div>
              </CardContent>
              <div style={classes.subheading}>
                Quantity: <TextField
                  value={item.quantity}
                  onChange={handleChange(i)}
                  type="number"
                  inputProps={{
                    min: 1
                  }}
                  style={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal" />
                <Button style={classes.removeButton} color="primary" onClick={removeItem(i)}>x Remove</Button>
              </div>
            </div>
          </Card>
            <Divider />
          </span>
        })
        }
        <div style={classes.checkout}>
          <span style={classes.total}>Total: ${getTotal()}</span>
          <Button color="secondary" variant="raised" onClick={openCheckout}>Checkout</Button>
          <Link to={`/user/?id=${props.currUser.id}`} style={classes.continueBtn}>
            <Button variant="raised">Continue Shopping</Button>
          </Link>
        </div>
      </span>) :
        <Typography type="subheading" component="h3" color="primary">No items added to your cart.</Typography>
      }
    </Card>
  )

})


export default CartItems