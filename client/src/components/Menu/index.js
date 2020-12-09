import React, { useEffect, useState } from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Button from 'material-ui/Button'
import { Link, withRouter } from 'react-router-dom'
import CartIcon from 'material-ui-icons/ShoppingCart'
import Badge from 'material-ui/Badge'
import queryString from 'query-string'
import API from "../../Utils/API-User"
import axios from "axios"

const isActive = (history, path) => {
    if (history.location.pathname == path)
        return { color: '#bef67a' }
    else
        return { color: '#ffffff' }
}
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
        return { color: '#bef67a' }
    else
        return { color: '#ffffff' }
}
const Menu = withRouter(({ history, currUser, setCurrUser }) => {
    // const [currUser, setCurrUser] = useState({
    //     id:'',
    //     cart:[],
    //     orders:[],
    //     histories:[],
    //     name:'',
    //     email:'',
    //     createDate:''
    // });

    // useEffect(()=>{
    //     if (history.location.pathname.includes("/user")){
    //         console.log(queryString.parse(history.location.search));
    //         const user_id = queryString.parse(history.location.search).id;
    //         axios.get(`../api/users/${user_id}`)
    //         .then(userInfo => {
    //             console.log(userInfo.data);
    //             setCurrUser({...currUser,
    //                 id: userInfo.data._id,
    //                 name: userInfo.data.name,
    //                 email: userInfo.data.email,
    //                 createDate: userInfo.data.createAt,
    //                 cart:userInfo.data.cart,
    //                 orders: userInfo.data.orders,
    //                 histories: userInfo.data.histories
    //             })
    //         })
    //     }
    // },[history.location]);

    return (
        <AppBar position="static" style={{ marginBottom: "20px" }}>
            <Toolbar style={{backgroundColor: "#3205fa"}}>
                <Typography type="title" color="inherit">
                     Brennan Best Buy Store
            </Typography>
                <div>
                    {history.location.pathname.includes("/user")|| history.location.pathname.includes("/cart") || history.location.pathname.includes("/profile") ? (
                        <Link to={`/user/?id=${currUser.id}`}>
                            <IconButton aria-label="Home" style={isPartActive(history, "/user")}>
                                <HomeIcon />
                            </IconButton>
                        </Link>
                    ) : (
                            <Link to="/">
                                <IconButton aria-label="Home" style={isActive(history, "/")}>
                                    <HomeIcon />
                                </IconButton>
                            </Link>)}
                    {history.location.pathname.includes("/user") && (
                        <Link to={`/cart/?id=${currUser.id}`}>
                            <Button style={isPartActive(history, "/cart")}>
                                Cart
            <Badge color="secondary" badgeContent={currUser.cart.length} style={{ 'marginLeft': '7px' }}>
                                    <CartIcon />
                                </Badge>
                            </Button>
                        </Link>
                    )}
                    {history.location.pathname.includes("/cart") && (
                        <Link to={`/cart/?id=${currUser.id}`}>
                            <Button style={isPartActive(history, "/cart")}>
                                Cart
            <Badge color="secondary" badgeContent={currUser.cart.length} style={{ 'marginLeft': '7px' }}>
                                    <CartIcon />
                                </Badge>
                            </Button>
                        </Link>
                    )}
                    {history.location.pathname.includes("/profile") && (
                        <Link to={`/cart/?id=${currUser.id}`}>
                            <Button style={isPartActive(history, "/cart")}>
                                Cart
            <Badge color="secondary" badgeContent={currUser.cart.length} style={{ 'marginLeft': '7px' }}>
                                    <CartIcon />
                                </Badge>
                            </Button>
                        </Link>
                    )}
                </div>
                <div style={{ 'position': 'absolute', 'right': '10px' }}>
                    <span style={{ 'float': 'right' }}>
                        {
                            history.location.pathname === "/" && (<span>
                                <Link to="/signup">
                                    <Button style={isActive(history, "/signup")}>Sign up</Button>
                                </Link>
                                <Link to="/signin">
                                    <Button style={isActive(history, "/signin")}>Sign In</Button>
                                </Link>
                            </span>)
                        }
                        {
                            history.location.pathname.includes("/user") && (<span>
                                <Link to={`/profile/?id=${currUser.id}`}>
                                    <Button style={isPartActive(history, "/profile")}>My Profile</Button>
                                </Link>
                                <Button color="inherit" onClick={() => history.push('/')}>Sign out</Button>
                            </span>)
                        }
                        {
                            history.location.pathname.includes("/cart") && (<span>
                                <Link to={`/profile/?id=${currUser.id}`}>
                                    <Button style={isPartActive(history, "/profile")}>My Profile</Button>
                                </Link>
                                <Button color="inherit" onClick={() => history.push('/')}>Sign out</Button>
                            </span>)
                        }
                        {
                            history.location.pathname.includes("/profile") && (<span>
                                <Link to={`/profile/?id=${currUser.id}`}>
                                    <Button style={isPartActive(history, "/profile")}>My Profile</Button>
                                </Link>
                                <Button color="inherit" onClick={() => history.push('/')}>Sign out</Button>
                            </span>)
                        }

                        {/* {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
          {auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
          </Link>
          <Button color="inherit" onClick={() => {
              auth.signout(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      } */}
                    </span>
                </div>
            </Toolbar>
        </AppBar>
    )
})

export default Menu